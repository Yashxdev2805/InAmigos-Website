import { Router } from 'express';
import { createDonation, getDonationReceipt } from '../controllers/donationsController';
import { applyVolunteer, listVolunteers } from '../controllers/volunteersController';
import { getCauses, getCauseBySlug } from '../controllers/causesController';
import { getTransparencyDocs } from '../controllers/transparencyController';
import { createRazorpayOrder, verifyRazorpayPayment, createStripePaymentIntent } from '../controllers/paymentGatewayController';
import { adminLogin, getCRMDashboard, updateVolunteerStatus } from '../controllers/adminController';
import { getLiveStats } from '../controllers/statsController';
import { getEvents, registerEventRSVP } from '../controllers/eventsController';
import { getGovernanceData } from '../controllers/governanceController';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = Router();

// Phase 5 Homepage Live Metrics Route
router.get('/stats', getLiveStats);

// Phase 11 Governance & M&E Framework Route
router.get('/governance', getGovernanceData);

// Phase 8 Dynamic Cause Routes
router.get('/causes', getCauses);
router.get('/causes/:slug', getCauseBySlug);

// Public Transparency Route (Phase 6)
router.get('/transparency', getTransparencyDocs);

// Phase 10 Ground Drives & Event RSVP Routes
router.get('/events', getEvents);
router.post('/events/rsvp', registerEventRSVP);

// Phase 7 Multi-Currency & UPI Donation Gateway Routes
router.post('/donations', createDonation);
router.get('/donations/receipt/:id', getDonationReceipt);
router.post('/payments/razorpay/order', createRazorpayOrder);
router.post('/payments/razorpay/verify', verifyRazorpayPayment);
router.post('/payments/stripe/intent', createStripePaymentIntent);

// Volunteer Routes (Phase 9)
router.post('/volunteers', applyVolunteer);
router.get('/volunteers', listVolunteers);

// Phase 12 Admin Auth & CRM Routes
router.post('/admin/login', adminLogin);
router.get('/admin/crm', requireAdminAuth as any, getCRMDashboard);
router.put('/admin/volunteers/:id/status', requireAdminAuth as any, updateVolunteerStatus);

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    phase: 'Phase 12 Admin Dashboard & CRM Integration Verified',
    service: 'InAmigos Backend REST API Engine',
    timestamp: new Date().toISOString(),
  });
});

export default router;
