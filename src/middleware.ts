export { default } from "next-auth/middleware"

export const config = { matcher: [
    '/',
    '/customers','/customers/create','/customers/:customerId*/edit',
    '/invoices','/invoices/create','/invoices/:invoiceId*/edit',
] }