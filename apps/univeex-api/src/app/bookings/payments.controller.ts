import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
@UseGuards(AuthGuard('jwt'))
export class PaymentsController {

  @Post('process')
  async processPayment(@Body() paymentData: any) {
    // Mock payment processing logic
    // In a real scenario, integrate Stripe or PayPal here
    return {
      success: true,
      transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'COMPLETED'
    };
  }
}
