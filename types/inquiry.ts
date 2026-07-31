export interface InquiryInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  items: string[];
  message?: string;
}

export interface Inquiry extends InquiryInput {
  _id: string;
  status: 'new' | 'handled';
  createdAt: string;
}

