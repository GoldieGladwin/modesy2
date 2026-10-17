export type OrderTab = 'orders' | 'quote-requests' | 'downloads' | 'refund-requests';

export type OrderStatus = 'Pending Payment' | 'Processing' | 'Completed' | 'Cancelled' | 'Shipped';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
  status: string;
  sku?: string;
  color?: string;
  size?: string;
  updatedAgo?: string;
}

export interface AddressInfo {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface Order {
  id: string;
  total: number;
  status: OrderStatus;
  date: string;
  currency?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  updatedAgo?: string;
  items?: OrderItem[];
  shippingAddress?: AddressInfo;
  billingAddress?: AddressInfo;
}

export interface QuoteRequest {
  id: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  status: 'New Quote Request' | 'Pending Quote' | 'Completed' | 'Accepted' | 'Declined';
  sellerBid?: number;
  timeAgo: string;
  seller: string;
  color?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  seller: string;
  image: string;
  rating: number;
  downloadUrl?: string;
  fileType?: string;
  fileSize?: string;
  licenseKey?: string;
}

export interface RefundRequest {
  id: string;
  orderId: string;
  productTitle: string;
  productImage: string;
  total: number;
  status: 'Pending' | 'Approved' | 'Declined' | 'Processing';
  date: string;
  reason?: string;
  adminNote?: string;
  seller?: string;
}

