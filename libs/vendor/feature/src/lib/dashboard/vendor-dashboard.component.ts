import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-wrapper">
      <aside class="dashboard-sidebar">
        <div class="brand">PartnerHub</div>
        <nav class="nav-menu">
          <a routerLink="./" class="nav-item active"><i class="fas fa-chart-pie"></i> Resumen</a>
          <a class="nav-item"><i class="fas fa-list"></i> Mis Excursiones</a>
          <a class="nav-item"><i class="fas fa-calendar-alt"></i> Calendario</a>
          <a class="nav-item"><i class="fas fa-inbox"></i> Mensajes <span class="badge">3</span></a>
          <a class="nav-item"><i class="fas fa-wallet"></i> Finanzas</a>
          <div class="divider"></div>
          <a class="nav-item"><i class="fas fa-cog"></i> Configuración</a>
        </nav>
        <div class="user-profile">
          <img src="https://ui-avatars.com/api/?name=Paris+Tours&background=0D8ABC&color=fff" alt="User">
          <div class="info">
            <div class="name">Paris Tours</div>
            <div class="role">Operador</div>
          </div>
        </div>
      </aside>

      <main class="dashboard-content">
        <header class="top-bar">
          <h1>Panel de Control</h1>
          <button class="btn-create">+ Nueva Excursión</button>
        </header>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="icon bg-blue"><i class="fas fa-eye"></i></div>
            <div class="data">
              <span class="label">Visitas Totales</span>
              <span class="value">24.5k</span>
              <span class="trend up">↑ 12% este mes</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="icon bg-green"><i class="fas fa-ticket-alt"></i></div>
            <div class="data">
              <span class="label">Reservas</span>
              <span class="value">142</span>
              <span class="trend up">↑ 5% este mes</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="icon bg-purple"><i class="fas fa-dollar-sign"></i></div>
            <div class="data">
              <span class="label">Ingresos</span>
              <span class="value">$12,840</span>
              <span class="trend down">↓ 2% vs mes pasado</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="icon bg-orange"><i class="fas fa-star"></i></div>
            <div class="data">
              <span class="label">Rating</span>
              <span class="value">4.8</span>
              <span class="trend">Basado en 34 reseñas</span>
            </div>
          </div>
        </div>

        <div class="section-activity">
          <h2>Reservas Recientes</h2>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Excursión</th>
                  <th>Fecha Viaje</th>
                  <th>Estado</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#BK-9012</td>
                  <td>Juan Pérez</td>
                  <td>Torre Eiffel VIP</td>
                  <td>25 Oct 2025</td>
                  <td><span class="status confirmed">Confirmada</span></td>
                  <td>$130.00</td>
                </tr>
                <tr>
                  <td>#BK-9013</td>
                  <td>Maria Smith</td>
                  <td>Cena en el Sena</td>
                  <td>26 Oct 2025</td>
                  <td><span class="status pending">Pendiente</span></td>
                  <td>$210.00</td>
                </tr>
                <tr>
                  <td>#BK-9014</td>
                  <td>Carlos Ruiz</td>
                  <td>Versalles Tour</td>
                  <td>28 Oct 2025</td>
                  <td><span class="status cancelled">Cancelada</span></td>
                  <td>$85.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-wrapper { display: flex; min-height: 100vh; background-color: #f3f4f6; font-family: 'Inter', sans-serif; }

    .dashboard-sidebar {
      width: 260px; background: white; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column;
      .brand { padding: 24px; font-size: 1.5rem; font-weight: 800; color: #008080; letter-spacing: -0.5px; }
      .nav-menu { flex: 1; padding: 0 12px; }
      .nav-item {
        display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #4b5563; text-decoration: none;
        border-radius: 8px; margin-bottom: 4px; font-weight: 500; transition: 0.2s; cursor: pointer;
        &:hover { background-color: #f3f4f6; color: #111; }
        &.active { background-color: #e0f2f1; color: #008080; }
        .badge { margin-left: auto; background: #ef4444; color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 10px; }
      }
      .divider { height: 1px; background: #e5e7eb; margin: 12px 0; }
      .user-profile {
        padding: 16px; border-top: 1px solid #e5e7eb; display: flex; align-items: center; gap: 12px;
        img { width: 40px; height: 40px; border-radius: 50%; }
        .name { font-weight: 600; font-size: 0.9rem; color: #111; }
        .role { font-size: 0.8rem; color: #6b7280; }
      }
    }

    .dashboard-content { flex: 1; padding: 32px; overflow-y: auto; }

    .top-bar {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;
      h1 { font-size: 1.8rem; color: #111; margin: 0; }
      .btn-create {
        background: #008080; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;
        &:hover { background: #006666; }
      }
    }

    .stats-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 32px;
      .stat-card {
        background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; display: flex; align-items: flex-start; gap: 16px;
        .icon {
          width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
          &.bg-blue { background: #e0f2fe; color: #0284c7; }
          &.bg-green { background: #dcfce7; color: #16a34a; }
          &.bg-purple { background: #f3e8ff; color: #9333ea; }
          &.bg-orange { background: #ffedd5; color: #ea580c; }
        }
        .data { display: flex; flex-direction: column; }
        .label { font-size: 0.85rem; color: #6b7280; margin-bottom: 4px; }
        .value { font-size: 1.5rem; font-weight: 700; color: #111; margin-bottom: 4px; }
        .trend { font-size: 0.8rem; &.up { color: #16a34a; } &.down { color: #ef4444; } }
      }
    }

    .section-activity {
      background: white; border-radius: 12px; border: 1px solid #e5e7eb; padding: 24px;
      h2 { font-size: 1.1rem; margin-bottom: 20px; color: #111; }
      table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
      th { text-align: left; color: #6b7280; font-weight: 500; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb; }
      td { padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #374151; }
      .status {
        padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;
        &.confirmed { background: #dcfce7; color: #16a34a; }
        &.pending { background: #fef9c3; color: #854d0e; }
        &.cancelled { background: #fee2e2; color: #991b1b; }
      }
    }
  `]
})
export class VendorDashboardComponent {}