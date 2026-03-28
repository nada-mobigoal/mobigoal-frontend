import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>MobiGoal</h1>
        <p class="tagline">Master Your SAT Exam</p>
      </div>
      
      <div class="start-section">
        <button class="start-btn" (click)="startPractice()">Start Practice</button>
      </div>
      
      <div class="features">
        <div class="feature">
          <h3>📚 Practice Questions</h3>
          <p>100+ questions per topic</p>
        </div>
        <div class="feature">
          <h3>📊 Progress Tracking</h3>
          <p>Track your improvement</p>
        </div>
        <div class="feature">
          <h3>💡 AI Explanations</h3>
          <p>Understand every answer</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
    }
    
    .hero {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .hero h1 {
      font-size: 4rem;
      margin: 0;
      background: linear-gradient(90deg, #00d9ff, #00ff88);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .tagline {
      font-size: 1.5rem;
      opacity: 0.8;
      margin-top: 0.5rem;
    }
    
    .start-btn {
      padding: 1rem 3rem;
      font-size: 1.5rem;
      background: linear-gradient(90deg, #00d9ff, #00ff88);
      border: none;
      border-radius: 50px;
      color: #1a1a2e;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .start-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
    }
    
    .features {
      display: flex;
      gap: 2rem;
      margin-top: 4rem;
    }
    
    .feature {
      text-align: center;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      min-width: 200px;
    }
    
    .feature h3 {
      margin: 0 0 0.5rem;
    }
    
    .feature p {
      margin: 0;
      opacity: 0.7;
    }
  `]
})
export class Home {
  constructor(private router: Router) {}

  startPractice(): void {
    this.router.navigate(['/practice']);
  }
}
