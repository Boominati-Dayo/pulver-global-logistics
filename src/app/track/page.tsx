'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '@/components/ClientLayout';
import { FaSearch, FaBox, FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaCopy, FaCheck, FaSpinner, FaRoute, FaMapPin, FaClock, FaShip, FaInfoCircle, FaCheckDouble, FaUndo, FaBan, FaPause, FaArrowRight, FaRuler, FaShippingFast, FaShieldAlt, FaHeadset, FaExclamationTriangle, FaGlobe, FaBolt, FaPlane, FaMap } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const TrackingMap = dynamic(() => import('@/components/TrackingMap'), { ssr: false });

const STATUS_ICONS: Record<string, any> = { pending: FaClock, 'picked up': FaBox, 'in transit': FaTruck, 'out for delivery': FaMapPin, delivered: FaCheckDouble, delayed: FaBan, exception: FaExclamationTriangle, 'on hold': FaPause, returned: FaUndo };
const STATUS_COLORS: Record<string, string> = { pending: '#f59e0b', 'picked up': '#a855f7', 'in transit': '#5f33ff', 'out for delivery': '#0ea5e9', delivered: '#84cc16', delayed: '#ef4444', exception: '#a3e635', 'on hold': '#eab308', returned: '#6b7280' };

interface Package { quantity: string; pieceType: string; description: string; weight: string; length?: string; width?: string; height?: string; }
interface ShipmentHistory { date: string; time: string; location: string; status: string; updatedBy: string; remarks: string; }
interface Shipment { _id: string; trackingNumber: string; shipperName: string; shipperAddress: string; shipperPhone: string; shipperEmail: string; receiverName: string; receiverAddress: string; receiverPhone: string; receiverEmail: string; origin: string; destination: string; carrier: string; shipmentType: string; shipmentMode: string; product: string; paymentMode: string; totalFreight: string; expectedDeliveryDate: string; pickupDate: string; packages: Package[]; shipmentHistory: ShipmentHistory[]; status: string; currentLocation: string; showLiveMap: boolean; }

function TrackContent() {
  const { isDarkMode } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const trackingFromUrl = searchParams.get('tracking');
    if (trackingFromUrl) { setTrackingNumber(trackingFromUrl); fetchTracking(trackingFromUrl); }
  }, [searchParams]);

  const fetchTracking = async (tracking: string) => {
    setIsLoading(true); setError(null); setShipment(null);
    try {
      const response = await fetch(`/api/trackings/${tracking}`);
      const data = await response.json();
      if (data.success) setShipment(data.data);
      else setError('Shipment not found. Please check your tracking number and try again.');
    } catch { setError('Shipment not found. Please check your tracking number and try again.'); }
    finally { setIsLoading(false); }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) { setError('Please enter a tracking number'); return; }
    window.history.pushState({}, '', `/track?tracking=${encodeURIComponent(trackingNumber.trim())}`);
    fetchTracking(trackingNumber.trim());
  };

  const statusColor = STATUS_COLORS[shipment?.status?.toLowerCase() || 'pending'] || '#6b7280';
  const statusIcon = STATUS_ICONS[shipment?.status?.toLowerCase() || 'pending'] || FaBox;
  const StatusIconComponent = statusIcon;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="bg-gradient-to-r from-[#2c00cc] to-[#5f33ff] text-white py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Track Your Shipment</h1>
          <p className="text-gray-300 mb-6 text-lg">Real-time tracking and shipment updates</p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                  <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="Enter tracking number (e.g. PGL123456)" className="w-full px-5 py-3 md:py-4 rounded-xl text-lg bg-white text-gray-900 placeholder-gray-500 shadow-lg focus:ring-2 focus:ring-[#84cc16]" />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl hidden sm:block" />
              </div>
              <button type="submit" disabled={isLoading} className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#84cc16] to-[#a3e635] text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                {isLoading ? <><FaSpinner className="animate-spin" /> <span className="hidden sm:inline">Tracking...</span></> : <><FaSearch /> <span className="hidden sm:inline">Track</span><span className="sm:hidden">Go</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="max-w-4xl mx-auto px-4 mt-6"><div className="bg-red-100 text-red-800 p-4 rounded-xl text-center border border-red-200">{error}</div></div>}

      {shipment && (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
          {/* Tracking Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Tracking Number</span>
                  <FaInfoCircle className="text-gray-400 text-xs" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl font-extrabold text-[#2c00cc] dark:text-white">{shipment.trackingNumber}</span>
                  <button onClick={() => { navigator.clipboard.writeText(shipment.trackingNumber); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    {copied ? <FaCheck className="text-green-500" /> : <FaCopy className="text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Route Summary */}
          <div className="bg-gradient-to-r from-[#2c00cc] to-[#5f33ff] rounded-2xl p-5 md:p-6 text-white">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FaRoute /> Shipment Route</h2>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <div className="text-center">
                <p className="text-xs text-white/60 uppercase tracking-wider mb-1">From</p>
                <p className="font-bold text-lg">{shipment.origin}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FaArrowRight className="text-[#84cc16] text-xl" />
                <span className="text-xs text-white/50">{shipment.shipmentMode}</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/60 uppercase tracking-wider mb-1">To</p>
                <p className="font-bold text-lg">{shipment.destination}</p>
              </div>
            </div>
          </div>

          {/* Live Map */}
          {shipment.showLiveMap && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 shadow-lg">
              <h2 className="text-lg font-bold text-[#2c00cc] dark:text-white mb-4 flex items-center gap-2"><FaMap className="text-[#84cc16]" /> Live Shipment Map</h2>
              <TrackingMap
                origin={shipment.origin}
                destination={shipment.destination}
                currentLocation={shipment.currentLocation}
              />
            </div>
          )}

          {/* Progress Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 shadow-lg">
            <h2 className="text-lg font-bold text-[#2c00cc] dark:text-white mb-6 flex items-center gap-2"><FaShippingFast className="text-[#84cc16]" /> Shipment Progress</h2>
            <div className="relative">
              <div className="absolute left-[18px] md:left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              <div className="space-y-5">
                {[...shipment.shipmentHistory].reverse().map((history, index) => {
                  const s = history.status.toLowerCase();
                  const color = STATUS_COLORS[s] || '#6b7280';
                  const IconComponent = STATUS_ICONS[s] || FaBox;
                  const isFirst = index === 0;
                  return (
                    <div key={index} className="relative pl-12 md:pl-16">
                      <div className="absolute left-0 mt-1 w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: isFirst ? color : `${color}20`, border: `2px solid ${color}` }}>
                        <IconComponent className={`text-base md:text-xl`} style={{ color: isFirst ? 'white' : color }} />
                      </div>
                      <div className={`p-3 md:p-4 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <span className="font-bold text-base" style={{ color }}>{history.status}</span>
                          <span className="text-xs text-gray-500">{history.date} at {history.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaMapMarkerAlt className="text-[#84cc16] flex-shrink-0" />
                          <span className="font-medium text-gray-900 dark:text-white">{history.location}</span>
                        </div>
                        {history.remarks && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{history.remarks}"</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 shadow-lg">
            <h2 className="text-lg font-bold text-[#2c00cc] dark:text-white mb-4 flex items-center gap-2"><FaInfoCircle className="text-[#84cc16]" /> Shipment Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[{ label: 'Carrier', value: shipment.carrier, icon: FaShip }, { label: 'Mode', value: shipment.shipmentMode, icon: FaTruck }, { label: 'Type', value: shipment.shipmentType || 'Standard', icon: FaBox }, { label: 'Payment', value: shipment.paymentMode, icon: FaShippingFast }].map((item, i) => {
                const Icon = item.icon;
                return <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-2"><Icon className="text-[#84cc16] text-sm" /><span className="text-xs text-gray-500">{item.label}</span></div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.value}</p>
                </div>;
              })}
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-[#84cc16]/10 to-[#a3e635]/10 rounded-xl border border-[#84cc16]/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#84cc16] to-[#a3e635] rounded-full flex items-center justify-center"><FaCalendarAlt className="text-white text-xl" /></div>
                <div><p className="text-sm text-gray-600 dark:text-gray-400">Expected Delivery</p><p className="font-bold text-[#2c00cc] dark:text-[#84cc16] text-lg">{shipment.expectedDeliveryDate || 'To be determined'}</p></div>
              </div>
            </div>
          </div>

          {/* Package Details */}
          {shipment.packages && shipment.packages.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 shadow-lg">
              <h2 className="text-lg font-bold text-[#2c00cc] dark:text-white mb-4 flex items-center gap-2"><FaBox className="text-[#84cc16]" /> Package Details</h2>
              <div className="space-y-4">
                {shipment.packages.map((pkg, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-[#84cc16]">Package {index + 1}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">{pkg.pieceType}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: 'Quantity', value: pkg.quantity },
                        { label: 'Weight', value: pkg.weight ? `${pkg.weight} kg` : '-' },
                        { label: 'Dimensions', value: (pkg.length && pkg.width && pkg.height) ? `${pkg.length}x${pkg.width}x${pkg.height} cm` : '-' },
                        { label: 'Description', value: pkg.description || '-' },
                      ].map((item, i) => (
                        <div key={i}>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 shadow-lg">
              <h2 className="text-lg font-bold text-[#2c00cc] dark:text-white mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-[#2c00cc] text-white rounded-full flex items-center justify-center text-sm font-bold">S</span>Shipper</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><FaUser className="text-[#84cc16] mt-0.5" /><div><p className="font-medium text-gray-900 dark:text-white">{shipment.shipperName}</p><p className="text-sm text-gray-500 break-words">{shipment.shipperAddress}</p></div></div>
                <div className="flex items-center gap-3"><FaPhone className="text-[#84cc16]" /><span className="text-sm text-gray-900 dark:text-white break-all">{shipment.shipperPhone}</span></div>
                <div className="flex items-center gap-3"><FaEnvelope className="text-[#84cc16]" /><span className="text-sm text-gray-900 dark:text-white break-all">{shipment.shipperEmail}</span></div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 shadow-lg">
              <h2 className="text-lg font-bold text-[#2c00cc] dark:text-white mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-gradient-to-br from-[#84cc16] to-[#a3e635] text-white rounded-full flex items-center justify-center text-sm font-bold">R</span>Receiver</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><FaUser className="text-[#84cc16] mt-0.5" /><div><p className="font-medium text-gray-900 dark:text-white">{shipment.receiverName}</p><p className="text-sm text-gray-500 break-words">{shipment.receiverAddress}</p></div></div>
                <div className="flex items-center gap-3"><FaPhone className="text-[#84cc16]" /><span className="text-sm text-gray-900 dark:text-white break-all">{shipment.receiverPhone}</span></div>
                <div className="flex items-center gap-3"><FaEnvelope className="text-[#84cc16]" /><span className="text-sm text-gray-900 dark:text-white break-all">{shipment.receiverEmail}</span></div>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="bg-gradient-to-r from-[#84cc16] to-[#a3e635] rounded-2xl p-5 md:p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#2c00cc] rounded-full flex items-center justify-center"><FaHeadset className="text-[#84cc16] text-2xl" /></div>
                <div><h3 className="text-lg font-bold text-white">Need Help?</h3><p className="text-white/70 text-sm">Contact our support team</p></div>
              </div>
              <a href="/contact" className="px-6 py-3 bg-[#2c00cc] text-white font-bold rounded-xl hover:bg-[#160066] transition-colors text-center">Contact Support</a>
            </div>
          </div>
        </div>
      )}

      {!shipment && !isLoading && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#2c00cc] dark:text-white mb-3">Why Track With Us?</h2>
            <p className="text-gray-600 dark:text-gray-400">Professional logistics solutions for your business</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[{ icon: FaMapMarkerAlt, title: 'Real-time Tracking', desc: 'GPS accuracy monitoring' }, { icon: FaShieldAlt, title: 'Secure Handling', desc: 'Fully insured shipments' }, { icon: FaBox, title: 'Detailed Updates', desc: 'Complete shipment history' }, { icon: FaHeadset, title: '24/7 Support', desc: 'Expert assistance anytime' }, { icon: FaBolt, title: 'Fast Delivery', desc: 'Express options available' }, { icon: FaGlobe, title: 'Global Coverage', desc: 'Track worldwide' }].map((feature, index) => {
              const Icon = feature.icon;
              return <div key={index} className="text-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"><div className="w-14 h-14 bg-[#84cc16]/10 rounded-full flex items-center justify-center mx-auto mb-4"><Icon className="text-2xl text-[#84cc16]" /></div><h3 className="text-lg font-bold text-[#2c00cc] dark:text-white mb-2">{feature.title}</h3><p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p></div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Track() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><FaSpinner className="animate-spin text-3xl text-[#84cc16]" /></div>}>
      <TrackContent />
    </Suspense>
  );
}