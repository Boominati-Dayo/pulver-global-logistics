import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage {
  quantity: string; pieceType: string; description: string;
  length: string; width: string; height: string; weight: string;
}

export interface IShipmentHistory {
  date: string; time: string; location: string; status: string; updatedBy: string; remarks: string;
}

export interface ITracking extends Document {
  trackingNumber: string; shipperName: string; shipperAddress: string; shipperPhone: string; shipperEmail: string;
  receiverName: string; receiverAddress: string; receiverPhone: string; receiverEmail: string;
  origin: string; destination: string; carrier: string; shipmentType: string; shipmentMode: string; product: string;
  productQuantity: string; paymentMode: string; totalFreight: string; expectedDeliveryDate: string;
  departureTime: string; pickupDate: string; pickupTime: string;
  quantity: string; pieceType: string; description: string; length: string; width: string; height: string; weight: string;
  packages: IPackage[]; shipmentHistory: IShipmentHistory[];
  status: string; currentLocation: string; showLiveMap: boolean; lastUpdated: Date; comments: string;
  createdAt: Date; updatedAt: Date;
}

const PackageSchema = new Schema<IPackage>({
  quantity: { type: String, default: '1' }, pieceType: { type: String, default: 'Box' },
  description: { type: String, default: '' }, length: { type: String, default: '0' },
  width: { type: String, default: '0' }, height: { type: String, default: '0' }, weight: { type: String, default: '0' },
});

const ShipmentHistorySchema = new Schema<IShipmentHistory>({
  date: { type: String, required: true }, time: { type: String, required: true },
  location: { type: String, required: true }, status: { type: String, required: true },
  updatedBy: { type: String, default: 'System' }, remarks: { type: String, default: '' },
});

const TrackingSchema = new Schema<ITracking>(
  {
    trackingNumber: { type: String, required: true, unique: true, index: true },
    shipperName: { type: String, required: true }, shipperAddress: { type: String, required: true },
    shipperPhone: { type: String, required: true }, shipperEmail: { type: String, required: true },
    receiverName: { type: String, required: true }, receiverAddress: { type: String, required: true },
    receiverPhone: { type: String, required: true }, receiverEmail: { type: String, required: true },
    origin: { type: String, required: true }, destination: { type: String, required: true },
    carrier: { type: String, required: true }, shipmentType: { type: String, required: true },
    shipmentMode: { type: String, required: true }, product: { type: String, default: '' },
    productQuantity: { type: String, default: '1' }, paymentMode: { type: String, required: true },
    totalFreight: { type: String, default: '0' }, expectedDeliveryDate: { type: String, required: true },
    departureTime: { type: String, default: '' }, pickupDate: { type: String, required: true }, pickupTime: { type: String, default: '' },
    quantity: { type: String, default: '1' }, pieceType: { type: String, default: 'Box' },
    description: { type: String, default: '' }, length: { type: String, default: '0' },
    width: { type: String, default: '0' }, height: { type: String, default: '0' }, weight: { type: String, default: '0' },
    packages: { type: [PackageSchema], default: [] }, shipmentHistory: { type: [ShipmentHistorySchema], default: [] },
    status: { type: String, default: 'Pending' }, currentLocation: { type: String, default: '' },
    showLiveMap: { type: Boolean, default: false }, comments: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Tracking || mongoose.model<ITracking>('Tracking', TrackingSchema);