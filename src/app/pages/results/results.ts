import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  template: `
    <div class="results-container">
      <div class="results-card">
        <h1>Quiz Complete! 🎉</h1>
        
        <div class="score">
          <div class="score-value">{{ correctCount }}/{{ totalCount }}</div>
          <div class="score-label">Correct Answers</div>
        </div>
        
        <div class="percentage" [class]="getScoreClass()">
          {{ getPercentage() }}% Score
        </div>
        
        <div class="message">
          {{ getMessage() }}
        </div>
        
        <div class="actions">
          <button class="retry-btn" (click)="retry()">Try Again</button>
          <button class="home-btn" (click)="goHome()">Go Home</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .results-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
    }
    
    .results-card {
      max-width: 500px;
      width: 100%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 3rem;
      text-align: center;
    }
    
    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    
    .score {
      margin-bottom: 1.5rem;
    }
    
    .score-value {
      font-size: 4rem;
      font-weight: bold;
      background: linear-gradient(90deg, #00d9ff, #00ff88);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .score-label {
      font-size: 1.2rem;
      opacity: 0.7;
    }
    
    .percentage {
      font-size: 1.5rem;
      font-weight: bold;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      display: inline-block;
      margin-bottom: 1.5rem;
    }
    
    .percentage.excellent { background: rgba(34, 197, 94, 0.3); color: #22c55e; }
    .percentage.good { background: rgba(59, 130, 246, 0.3); color: #3b82f6; }
    .percentage.needs-work { background: rgba(245, 158, 11, 0.3); color: #f59e0b; }
    
    .message {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.8;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    
    .retry-btn, .home-btn {
      padding: 1rem 2rem;
      font-size: 1rem;
      border-radius: 50px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .retry-btn {
      background: linear-gradient(90deg, #00d9ff, #00ff88);
      border: none;
      color: #1a1a2e;
      font-weight: bold;
    }
    
    .home-btn {
      background: transparent;
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
    }
    
    .retry-btn:hover, .home-btn:hover {
      transform: scale(1.05);
    }
  `]
})
export class Results {
  correctCount = 2;
  totalCount = 3;
  
  constructor(private router: Router) {}
  
  getPercentage(): number {
    return Math.round((this.correctCount / this.totalCount) * 100);
  }
  
  getScoreClass(): string {
    const pct = this.getPercentage();
    if (pct >= 80) return 'excellent';
    if (pct >= 60) return 'good';
    return 'needs-work';
  }
  
  getMessage(): string {
    const pct = this.getPercentage();
    if (pct >= 80) return 'Excellent work! Keep it up! 🌟';
    if (pct >= 60) return 'Good job! Room for improvement.';
    return 'Keep practicing! You can do it! 💪';
  }
  
  retry(): void {
    this.router.navigate(['/practice']);
  }
  
  goHome(): void {
    this.router.navigate(['/home']);
  }
}
