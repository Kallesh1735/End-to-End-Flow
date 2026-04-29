export const TIMELINE = [
  { id: 1, title: 'Seller creates invoice', desc: 'Invoice created in seller ERP and queued for collection.', owner: 'Seller', icon: 'file-text' },
  { id: 2, title: 'ERP forwards invoice', desc: 'ERP transmits invoice payload to the collection platform.', owner: 'ERP', icon: 'server' },
  { id: 3, title: 'Platform creates buyer relationship', desc: 'Platform maps buyer entity and prepares invitation context.', owner: 'Platform', icon: 'users' },
  { id: 4, title: 'Secure invitation sent', desc: 'Platform issues a secure, single-use link to the buyer.', owner: 'Platform', icon: 'link' },
  { id: 5, title: 'Buyer clicks secure link', desc: 'Buyer arrives at the presentation entry point (no invoice shown).', owner: 'Buyer', icon: 'external-link' },
  { id: 6, title: 'Login / Signup appears', desc: 'Authentication gate prompts buyer to sign in or register.', owner: 'Buyer', icon: 'log-in' },
  { id: 7, title: 'OTP verification', desc: 'One-time passcode verifies possession of the registered channel.', owner: 'Buyer', icon: 'key' },
  { id: 8, title: 'Buyer identity matched', desc: 'Identity mapping ensures the correct legal entity and KYC.', owner: 'Platform', icon: 'user-check' },
  { id: 9, title: 'Platform loads request context', desc: 'Secure request token maps invoice context and permissions.', owner: 'Platform', icon: 'download-cloud' },
  { id: 10, title: 'Buyer dashboard opens', desc: 'Presentation dashboard reveals pending actions in a controlled view.', owner: 'Buyer', icon: 'grid' },
  { id: 11, title: 'Pending invoices visible', desc: 'Buyer sees invoices eligible for mandate and payment.', owner: 'Buyer', icon: 'list' },
  { id: 12, title: 'eMandate approved', desc: 'Buyer consents to automated debit via eMandate flows.', owner: 'Buyer', icon: 'check' },
  { id: 13, title: 'Easebuzz processes mandate', desc: 'Third-party mandate processor ingests the mandate request.', owner: 'Easebuzz', icon: 'cpu' },
  { id: 14, title: 'NPCI validates', desc: 'NPCI runs validation and risk checks on mandate payload.', owner: 'NPCI', icon: 'shield' },
  { id: 15, title: 'UMRN created', desc: 'Unique Mandate Reference Number returned for tracking.', owner: 'NPCI', icon: 'hash' },
  { id: 16, title: 'Scheduler waits & validates', desc: 'Platform schedules debit, performs pre-debit checks before execution.', owner: 'Platform', icon: 'clock' },
  { id: 17, title: 'Debit executed & settlement', desc: 'Debit executes through banking rails and settlement completes.', owner: 'Bank', icon: 'credit-card' },
  { id: 18, title: 'ERP updated', desc: 'Final settlement, UTR mapping and reconciliation pushed to ERP.', owner: 'ERP', icon: 'database' }
]

export const LANES = ['Seller','ERP','Platform','Identity','Buyer','Easebuzz','NPCI','Bank']
