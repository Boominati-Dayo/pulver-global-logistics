'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getStatusBg, getStatusText } from '@/lib/statusUtils';
import { FaSearch, FaPlus, FaTrash, FaEnvelope, FaTimes, FaSpinner, FaCheck, FaUser, FaBox, FaArrowRight, FaCalendar, FaClock, FaEdit, FaMapMarkerAlt, FaGlobe, FaArrowUp, FaCog } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Tracking {
  _id: string;
  trackingNumber: string;
  shipperName: string;
  shipperEmail: string;
  shipperPhone: string;
  shipperAddress: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  receiverAddress: string;
  origin: string;
  destination: string;
  carrier: string;
  status: string;
  expectedDeliveryDate: string;
  shipmentMode: string;
  currentLocation: string;
  showLiveMap: boolean;
  createdAt: string;
}

export default function Admin() {
  const [trackings, setTrackings] = useState<Tracking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState<Tracking | null>(null);
  const [messageRecipient, setMessageRecipient] = useState<'shipper' | 'receiver'>('receiver');
  const [messageData, setMessageData] = useState({ subject: '', message: '', senderName: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({ status: '', currentLocation: '', remarks: '' });
  const [togglingMap, setTogglingMap] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    shipperName: '', shipperAddress: '', shipperPhone: '', shipperEmail: '',
    receiverName: '', receiverAddress: '', receiverPhone: '', receiverEmail: '',
    origin: '', destination: '', carrier: '', shipmentType: 'Documents', shipmentMode: 'Air',
    product: '', productQuantity: '1', paymentMode: 'Credit', totalFreight: '',
    expectedDeliveryDate: '', departureTime: '', pickupDate: '', pickupTime: '',
  });

  const [packages, setPackages] = useState([{ quantity: '1', pieceType: 'Box', description: '', length: '', width: '', height: '', weight: '' }]);

  const addPackage = () => {
    setPackages([...packages, { quantity: '1', pieceType: 'Box', description: '', length: '', width: '', height: '', weight: '' }]);
  };

  const removePackage = (index: number) => {
    if (packages.length > 1) {
      setPackages(packages.filter((_, i) => i !== index));
    }
  };

  const updatePackage = (index: number, field: string, value: string) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], [field]: value };
    setPackages(updated);
  };

  const toggleLiveMap = async (trackingNumber: string, currentValue: boolean) => {
    setTogglingMap(trackingNumber);
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/trackings/${trackingNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ showLiveMap: !currentValue }),
      });
      fetchTrackings();
    } catch (error) { console.error('Failed to toggle live map:', error); }
    finally { setTogglingMap(null); }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin/login'); return; }
    fetchTrackings();
  }, []);

  const fetchTrackings = async () => {
    try {
      const response = await fetch('/api/trackings');
      const data = await response.json();
      if (data.success) setTrackings(data.data);
    } catch (error) { console.error('Failed to fetch trackings:', error); }
    finally { setIsLoading(false); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/trackings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          ...formData,
          packages: packages,
          shipmentHistory: [{ date: new Date().toISOString().split('T')[0], time: new Date().toLocaleTimeString('en-US', { hour12: false }), location: formData.origin, status: 'Pending', updatedBy: 'Admin', remarks: 'Shipment created' }]
        }),
      });
      const data = await response.json();
      if (data.success) {
        setShowForm(false);
        setFormData({ shipperName: '', shipperAddress: '', shipperPhone: '', shipperEmail: '', receiverName: '', receiverAddress: '', receiverPhone: '', receiverEmail: '', origin: '', destination: '', carrier: '', shipmentType: 'Documents', shipmentMode: 'Air', product: '', productQuantity: '1', paymentMode: 'Credit', totalFreight: '', expectedDeliveryDate: '', departureTime: '', pickupDate: '', pickupTime: '' });
        setPackages([{ quantity: '1', pieceType: 'Box', description: '', length: '', width: '', height: '', weight: '' }]);
        fetchTrackings();
      }
    } catch (error) { console.error('Failed to create tracking:', error); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (trackingNumber: string) => {
    if (!confirm('Are you sure you want to delete this tracking?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/trackings/${trackingNumber}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      fetchTrackings();
    } catch (error) { console.error('Failed to delete tracking:', error); }
  };

  const openMessageModal = (tracking: Tracking, recipient: 'shipper' | 'receiver') => {
    setSelectedTracking(tracking);
    setMessageRecipient(recipient);
    setMessageData({ subject: `Regarding shipment ${tracking.trackingNumber}`, message: '', senderName: '' });
    setSendSuccess(false);
    setShowMessageModal(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTracking) return;
    setIsSending(true);
    try {
      const recipient = messageRecipient === 'shipper' ? { email: selectedTracking.shipperEmail, name: selectedTracking.shipperName } : { email: selectedTracking.receiverEmail, name: selectedTracking.receiverName };
      const response = await fetch('/api/admin/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toEmail: recipient.email, toName: recipient.name, trackingNumber: selectedTracking.trackingNumber, subject: messageData.subject, message: messageData.message, senderName: messageData.senderName || 'SwiftXpress Inc. Team' }),
      });
      const data = await response.json();
      if (data.success) { setSendSuccess(true); setTimeout(() => { setShowMessageModal(false); setSelectedTracking(null); }, 2000); }
    } catch (error) { console.error('Failed to send message:', error); }
    finally { setIsSending(false); }
  };

  const openUpdateModal = (tracking: Tracking) => {
    setSelectedTracking(tracking);
    setUpdateData({ status: tracking.status, currentLocation: tracking.currentLocation || '', remarks: '' });
    setShowUpdateModal(true);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTracking) return;
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/trackings/${selectedTracking.trackingNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          status: updateData.status,
          currentLocation: updateData.currentLocation,
          sendEmailNotification: true,
          newHistoryEntry: {
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('en-US', { hour12: false }),
            location: updateData.currentLocation || selectedTracking.destination,
            status: updateData.status,
            updatedBy: 'Admin',
            remarks: updateData.remarks
          }
        }),
      });
      const data = await response.json();
      if (data.success) {
        setShowUpdateModal(false);
        setSelectedTracking(null);
        fetchTrackings();
      }
    } catch (error) { console.error('Failed to update status:', error); }
    finally { setIsUpdating(false); }
  };

  const openEditModal = (tracking: Tracking) => {
    setSelectedTracking(tracking);
    setEditData({
      shipperName: tracking.shipperName,
      shipperAddress: tracking.shipperAddress,
      shipperPhone: tracking.shipperPhone,
      shipperEmail: tracking.shipperEmail,
      receiverName: tracking.receiverName,
      receiverAddress: tracking.receiverAddress,
      receiverPhone: tracking.receiverPhone,
      receiverEmail: tracking.receiverEmail,
      origin: tracking.origin,
      destination: tracking.destination,
      carrier: tracking.carrier,
      shipmentMode: tracking.shipmentMode,
      expectedDeliveryDate: tracking.expectedDeliveryDate,
      paymentMode: 'Credit',
      totalFreight: '',
      showLiveMap: tracking.showLiveMap || false,
    });
    setShowEditModal(true);
  };

  const [editData, setEditData] = useState({
    shipperName: '', shipperAddress: '', shipperPhone: '', shipperEmail: '',
    receiverName: '', receiverAddress: '', receiverPhone: '', receiverEmail: '',
    origin: '', destination: '', carrier: '', shipmentMode: 'Air',
    expectedDeliveryDate: '', paymentMode: 'Credit', totalFreight: '',
    showLiveMap: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTracking) return;
    setIsEditing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/trackings/${selectedTracking.trackingNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editData),
      });
      const data = await response.json();
      if (data.success) {
        setShowEditModal(false);
        setSelectedTracking(null);
        fetchTrackings();
      }
    } catch (error) { console.error('Failed to edit shipment:', error); }
    finally { setIsEditing(false); }
  };

  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); router.push('/admin/login'); };

  const filteredTrackings = trackings.filter(t => t.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) || t.shipperName.toLowerCase().includes(searchQuery.toLowerCase()) || t.receiverName.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 px-4">
      <ToastContainer position="top-center" autoClose={4000} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage shipments and track deliveries</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2c5282] shadow-lg">
              <FaPlus /> New Shipment
            </button>
            <button onClick={() => setShowSettings(!showSettings)} className="flex items-center gap-2 px-5 py-2.5 bg-[#ea580c] text-white rounded-lg hover:bg-[#f97316] shadow-lg">
              <FaCog /> Site Settings
            </button>
            <button onClick={handleLogout} className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{ label: 'Total Shipments', value: trackings.length }, { label: 'In Transit', value: trackings.filter(t => t.status === 'In Transit').length }, { label: 'Delivered', value: trackings.filter(t => t.status === 'Delivered').length }, { label: 'Pending', value: trackings.filter(t => t.status === 'Pending').length }].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#ea580c] dark:text-[#f97316]">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by tracking number, shipper or receiver..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ea580c] focus:border-transparent" />
          </div>
        </div>

        <div className="grid gap-4 md:hidden">
          {filteredTrackings.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No shipments found</div>
          ) : filteredTrackings.map((tracking) => (
            <div key={tracking._id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-[#ea580c] dark:text-[#f97316] text-lg">{tracking.trackingNumber}</p>
                  <p className="text-xs text-gray-500">{tracking.origin} → {tracking.destination}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBg(tracking.status)}`}>{tracking.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Shipper</p>
                  <p className="font-medium text-gray-900 dark:text-white truncate">{tracking.shipperName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Receiver</p>
                  <p className="font-medium text-gray-900 dark:text-white truncate">{tracking.receiverName}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => openUpdateModal(tracking)} className="flex-1 min-w-[80px] px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 flex items-center justify-center gap-1"><FaEdit size={12} /> Update</button>
                <button onClick={() => openEditModal(tracking)} className="flex-1 min-w-[80px] px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 flex items-center justify-center gap-1"><FaArrowUp size={12} /> Edit</button>
                <button onClick={() => openMessageModal(tracking, 'receiver')} className="flex-1 min-w-[80px] px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 flex items-center justify-center gap-1"><FaEnvelope size={12} /> Msg</button>
                <Link href={`/track?tracking=${tracking.trackingNumber}`} className="flex-1 min-w-[80px] px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-1"><FaGlobe size={12} /> View</Link>
                <button onClick={() => handleDelete(tracking.trackingNumber)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 flex items-center justify-center"><FaTrash size={12} /></button>
                <button onClick={() => toggleLiveMap(tracking.trackingNumber, tracking.showLiveMap)} disabled={togglingMap === tracking.trackingNumber} className="flex-1 min-w-[80px] px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-50">
                  {togglingMap === tracking.trackingNumber ? <FaSpinner className="animate-spin" size={12} /> : <FaMapMarkerAlt size={12} />}
                  {tracking.showLiveMap ? 'Map On' : 'Map Off'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block bg-gray-900 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Tracking #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Shipper</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Receiver</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Route</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Map</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTrackings.map((tracking) => (
                  <tr key={tracking._id} className="hover:bg-gray-800/50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-[#ea580c]">{tracking.trackingNumber}</td>
                    <td className="px-4 py-4 text-sm"><p className="text-gray-100 font-medium">{tracking.shipperName}</p><p className="text-gray-400 text-xs">{tracking.shipperEmail}</p></td>
                    <td className="px-4 py-4 text-sm"><p className="text-gray-100 font-medium">{tracking.receiverName}</p><p className="text-gray-400 text-xs">{tracking.receiverEmail}</p></td>
                    <td className="px-4 py-4 text-sm text-gray-300">{tracking.origin} → {tracking.destination}</td>
                    <td className="px-4 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBg(tracking.status)}`}>{tracking.status}</span></td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button onClick={() => toggleLiveMap(tracking.trackingNumber, tracking.showLiveMap)} disabled={togglingMap === tracking.trackingNumber} className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${tracking.showLiveMap ? 'bg-[#ea580c] text-white' : 'bg-gray-600 text-white'} hover:opacity-80 disabled:opacity-50`}>
                        {togglingMap === tracking.trackingNumber ? <FaSpinner className="animate-spin" size={10} /> : <FaMapMarkerAlt size={10} />}
                        {tracking.showLiveMap ? 'On' : 'Off'}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        <button onClick={() => openUpdateModal(tracking)} className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 px-2 py-1 bg-blue-50 rounded"><FaEdit size={12} /> Update</button>
                        <button onClick={() => openEditModal(tracking)} className="text-purple-600 hover:text-purple-800 text-xs flex items-center gap-1 px-2 py-1 bg-purple-50 rounded"><FaArrowUp size={12} /> Edit</button>
                        <button onClick={() => openMessageModal(tracking, 'receiver')} className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 px-2 py-1 bg-blue-50 rounded"><FaEnvelope size={12} /> Msg</button>
                        <Link href={`/track?tracking=${tracking.trackingNumber}`} className="text-gray-600 hover:text-gray-800 dark:text-gray-400 text-xs flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-700 rounded"><FaGlobe size={12} /> View</Link>
                        <button onClick={() => handleDelete(tracking.trackingNumber)} className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1 px-2 py-1 bg-red-50 rounded"><FaTrash size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[95vh] my-2 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-[#1a365d] to-[#2c5282] px-4 md:px-6 py-3 md:py-4 flex justify-between items-center sticky top-0 z-10">
              <div><h2 className="text-lg md:text-xl font-bold text-white">Create New Shipment</h2><p className="text-white/70 text-xs md:text-sm hidden sm:block">Fill in the shipment details</p></div>
              <button onClick={() => setShowForm(false)} className="text-white/70 hover:text-white"><FaTimes size={20} /></button>
            </div>
            <div className="p-3 md:p-6 overflow-y-auto max-h-[calc(95vh-70px)]">
              <form onSubmit={handleCreate} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm md:text-base"><FaUser className="text-[#ea580c]" /> Shipper Information</h3>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipper Name *</label><input type="text" required placeholder="Full name" value={formData.shipperName} onChange={(e) => setFormData({...formData, shipperName: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipper Address *</label><input type="text" required placeholder="Shipping address" value={formData.shipperAddress} onChange={(e) => setFormData({...formData, shipperAddress: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipper Phone *</label><input type="tel" required placeholder="Phone number" value={formData.shipperPhone} onChange={(e) => setFormData({...formData, shipperPhone: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipper Email *</label><input type="email" required placeholder="Email address" value={formData.shipperEmail} onChange={(e) => setFormData({...formData, shipperEmail: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm md:text-base"><FaBox className="text-[#ea580c]" /> Receiver Information</h3>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Receiver Name *</label><input type="text" required placeholder="Full name" value={formData.receiverName} onChange={(e) => setFormData({...formData, receiverName: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Receiver Address *</label><input type="text" required placeholder="Delivery address" value={formData.receiverAddress} onChange={(e) => setFormData({...formData, receiverAddress: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Receiver Phone *</label><input type="tel" required placeholder="Phone number" value={formData.receiverPhone} onChange={(e) => setFormData({...formData, receiverPhone: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Receiver Email *</label><input type="email" required placeholder="Email address" value={formData.receiverEmail} onChange={(e) => setFormData({...formData, receiverEmail: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 md:p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base"><FaArrowRight className="text-[#ea580c]" /> Shipment Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Origin *</label><input type="text" required placeholder="Origin" value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destination *</label><input type="text" required placeholder="Destination" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Carrier *</label><input type="text" required placeholder="Carrier" value={formData.carrier} onChange={(e) => setFormData({...formData, carrier: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-3 md:mt-4">
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label><select value={formData.shipmentType} onChange={(e) => setFormData({...formData, shipmentType: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base"><option>Documents</option><option>Electronics</option><option>Furniture</option><option>Clothing</option><option>Food Items</option><option>Medical Supplies</option><option>Other</option></select></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mode</label><select value={formData.shipmentMode} onChange={(e) => setFormData({...formData, shipmentMode: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base"><option value="Air">Air</option><option value="Sea">Sea</option><option value="Road">Road</option></select></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product</label><input type="text" placeholder="Product" value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment</label><select value={formData.paymentMode} onChange={(e) => setFormData({...formData, paymentMode: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base"><option value="Cash">Cash</option><option value="Credit">Credit</option><option value="Account">Account</option></select></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><FaCalendar className="text-[#ea580c]" /> Delivery *</label><input type="date" required value={formData.expectedDeliveryDate} onChange={(e) => setFormData({...formData, expectedDeliveryDate: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                  <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><FaCalendar className="text-[#ea580c]" /> Pickup *</label><input type="date" required value={formData.pickupDate} onChange={(e) => setFormData({...formData, pickupDate: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                  <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><FaClock className="text-[#ea580c]" /> Departure</label><input type="time" value={formData.departureTime} onChange={(e) => setFormData({...formData, departureTime: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><FaBox className="text-[#ea580c]" /> Package Details</h3>
                    <button type="button" onClick={addPackage} className="px-4 py-2 bg-[#ea580c] text-white rounded-lg text-sm font-medium hover:bg-[#f97316] flex items-center gap-2">
                      <FaPlus size={14} /> Add Package
                    </button>
                  </div>
                  {packages.map((pkg, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-4 relative">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Package {index + 1}</span>
                        {packages.length > 1 && (
                          <button type="button" onClick={() => removePackage(index)} className="text-red-500 hover:text-red-700">
                            <FaTrash size={16} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div><label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Quantity *</label><input type="number" required min="1" value={pkg.quantity} onChange={(e) => updatePackage(index, 'quantity', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm" /></div>
                        <div><label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Piece Type</label><select value={pkg.pieceType} onChange={(e) => updatePackage(index, 'pieceType', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm"><option>Box</option><option>Envelope</option><option>Pallet</option><option>Crate</option><option>Bag</option></select></div>
                        <div><label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Weight (kg) *</label><input type="number" required min="0" step="0.1" placeholder="0" value={pkg.weight} onChange={(e) => updatePackage(index, 'weight', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm" /></div>
                        <div><label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Description</label><input type="text" placeholder="Package description" value={pkg.description} onChange={(e) => updatePackage(index, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm" /></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div><label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Length (cm)</label><input type="number" min="0" placeholder="0" value={pkg.length} onChange={(e) => updatePackage(index, 'length', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm" /></div>
                        <div><label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Width (cm)</label><input type="number" min="0" placeholder="0" value={pkg.width} onChange={(e) => updatePackage(index, 'width', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm" /></div>
                        <div><label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Height (cm)</label><input type="number" min="0" placeholder="0" value={pkg.height} onChange={(e) => updatePackage(index, 'height', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm" /></div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Freight ($)</label>
                    <input type="number" min="0" placeholder="0" value={formData.totalFreight} onChange={(e) => setFormData({...formData, totalFreight: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ea580c]" />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-[#1a365d] text-white font-semibold rounded-lg hover:bg-[#2c5282] disabled:opacity-50 flex items-center gap-2">
                    {isSubmitting ? <><FaSpinner className="animate-spin" /> Creating...</> : <><FaCheck /> Create Shipment</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showMessageModal && selectedTracking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 w-full max-w-lg shadow-2xl">
            {sendSuccess ? (
              <div className="text-center py-6 md:py-8"><div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><FaCheck className="text-green-600 text-2xl md:text-3xl" /></div><h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h3></div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4 md:mb-6"><h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><FaEnvelope className="text-[#ea580c]" /> Send Message</h2><button onClick={() => setShowMessageModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400"><FaTimes size={20} /></button></div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 md:p-4 mb-4">
                  <p className="text-xs md:text-sm text-gray-500">To: <span className="font-medium text-gray-900 dark:text-white">{messageRecipient === 'shipper' ? selectedTracking.shipperName : selectedTracking.receiverName}</span></p>
                  <p className="text-xs md:text-sm text-gray-500">Ref: <span className="font-bold text-[#ea580c] dark:text-[#f97316]">{selectedTracking.trackingNumber}</span></p>
                </div>
                <form onSubmit={handleSendMessage} className="space-y-3 md:space-y-4">
                  <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label><input type="text" required value={messageData.subject} onChange={(e) => setMessageData({...messageData, subject: e.target.value})} className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                  <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label><textarea required rows={3} value={messageData.message} onChange={(e) => setMessageData({...messageData, message: e.target.value})} className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-sm md:text-base" /></div>
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 md:gap-3 pt-2"><button type="button" onClick={() => setShowMessageModal(false)} className="px-4 md:px-5 py-2 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm md:text-base">Cancel</button><button type="submit" disabled={isSending} className="px-4 md:px-5 py-2 bg-[#1a365d] text-white rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base">{isSending ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaEnvelope /> Send</>}</button></div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {showMessageModal && selectedTracking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 w-full max-w-lg shadow-2xl">
            {sendSuccess ? (
              <div className="text-center py-6 md:py-8"><div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><FaCheck className="text-green-600 text-2xl md:text-3xl" /></div><h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h3></div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4 md:mb-6"><h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><FaEnvelope className="text-[#ea580c]" /> Send Message</h2><button onClick={() => setShowMessageModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400"><FaTimes size={20} /></button></div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 md:p-4 mb-4">
                  <p className="text-xs md:text-sm text-gray-500">To: <span className="font-medium text-gray-900 dark:text-white">{messageRecipient === 'shipper' ? selectedTracking.shipperName : selectedTracking.receiverName}</span></p>
                  <p className="text-xs md:text-sm text-gray-500">Ref: <span className="font-bold text-[#ea580c] dark:text-[#f97316]">{selectedTracking.trackingNumber}</span></p>
                </div>
                <form onSubmit={handleSendMessage} className="space-y-3 md:space-y-4">
                  <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label><input type="text" required value={messageData.subject} onChange={(e) => setMessageData({...messageData, subject: e.target.value})} className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base" /></div>
                  <div><label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label><textarea required rows={3} value={messageData.message} onChange={(e) => setMessageData({...messageData, message: e.target.value})} className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-sm md:text-base" /></div>
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 md:gap-3 pt-2"><button type="button" onClick={() => setShowMessageModal(false)} className="px-4 md:px-5 py-2 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm md:text-base">Cancel</button><button type="submit" disabled={isSending} className="px-4 md:px-5 py-2 bg-[#1a365d] text-white rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base">{isSending ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaEnvelope /> Send</>}</button></div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {showSettings && <SiteSettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

function SiteSettingsModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState('+1 (234) 567-890');
  const [email, setEmail] = useState('info@swiftxpressinc.com');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.data.phone) setPhone(data.data.phone);
          if (data.data.email) setEmail(data.data.email);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'phone', value: phone }),
      });
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'email', value: email }),
      });
      toast.success('Settings saved successfully!');
      onClose();
      window.location.reload();
    } catch { toast.error('Failed to save settings'); }
    finally { setIsSaving(false); }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <FaSpinner className="animate-spin text-white text-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="bg-gradient-to-r from-[#1a365d] to-[#2c5282] px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div><h2 className="text-xl font-bold text-white">Site Settings</h2><p className="text-white/70 text-sm">Update contact information</p></div>
          <button onClick={onClose} className="text-white/70 hover:text-white"><FaTimes size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <button onClick={handleSave} disabled={isSaving} className="w-full py-3 bg-[#ea580c] text-white font-bold rounded-lg hover:bg-[#f97316] disabled:opacity-50 flex items-center justify-center gap-2">
            {isSaving ? <><FaSpinner className="animate-spin" /> Saving...</> : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}