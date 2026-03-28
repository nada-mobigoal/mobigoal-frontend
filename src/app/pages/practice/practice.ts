import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuestionService, Question, AnswerResult } from '../../services/question';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="practice-container">
      <header class="header">
        <button class="back-btn" (click)="goHome()">← Home</button>
        <div class="progress">Question {{ currentIndex + 1 }} / {{ totalQuestions }}</div>
      </header>
      
      <div class="question-card" *ngIf="currentQuestion">
        <div class="difficulty-badge" [class]="currentQuestion.difficulty">
          {{ currentQuestion.difficulty }}
        </div>
        
        <h2 class="question-text">{{ currentQuestion.text }}</h2>
        
        <div class="options">
          <button 
            *ngFor="let option of currentQuestion.options; let i = index"
            class="option-btn"
            [class.selected]="selectedAnswer === i"
            [class.correct]="showResult && i === currentQuestion.correctAnswer"
            [class.wrong]="showResult && selectedAnswer === i && i !== currentQuestion.correctAnswer"
            (click)="selectAnswer(i)"
            [disabled]="showResult"
          >
            <span class="option-letter">{{ getOptionLetter(i) }}</span>
            {{ option }}
          </button>
        </div>
        
        <div class="actions" *ngIf="!showResult">
          <button 
            class="submit-btn" 
            [disabled]="selectedAnswer === null"
            (click)="submitAnswer()"
          >
            Submit Answer
          </button>
        </div>
        
        <div class="result" *ngIf="showResult">
          <div class="result-message" [class.correct]="isCorrect" [class.wrong]="!isCorrect">
            {{ isCorrect ? '✓ Correct!' : '✗ Incorrect' }}
          </div>
          <button class="next-btn" (click)="nextQuestion()">
            {{ currentIndex + 1 < totalQuestions ? 'Next Question →' : 'View Results →' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .practice-container {
      min-height: 100vh;
      padding: 1rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .back-btn {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
    }
    
    .progress {
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    .question-card {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 2rem;
    }
    
    .difficulty-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    
    .difficulty-badge.easy { background: #22c55e; color: #1a1a2e; }
    .difficulty-badge.medium { background: #f59e0b; color: #1a1a2e; }
    .difficulty-badge.hard { background: #ef4444; color: white; }
    
    .question-text {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .option-btn {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.5rem;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }
    
    .option-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
      border-color: #00d9ff;
    }
    
    .option-btn.selected {
      border-color: #00d9ff;
      background: rgba(0, 217, 255, 0.2);
    }
    
    .option-btn.correct {
      border-color: #22c55e;
      background: rgba(34, 197, 94, 0.3);
    }
    
    .option-btn.wrong {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.3);
    }
    
    .option-letter {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      font-weight: bold;
    }
    
    .actions {
      margin-top: 2rem;
      text-align: center;
    }
    
    .submit-btn {
      padding: 1rem 2rem;
      font-size: 1.1rem;
      background: linear-gradient(90deg, #00d9ff, #00ff88);
      border: none;
      border-radius: 50px;
      color: #1a1a2e;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .submit-btn:hover:not(:disabled) {
      transform: scale(1.05);
    }
    
    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .result {
      margin-top: 2rem;
      text-align: center;
    }
    
    .result-message {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    
    .result-message.correct { color: #22c55e; }
    .result-message.wrong { color: #ef4444; }
    
    .next-btn {
      padding: 1rem 2rem;
      font-size: 1.1rem;
      background: linear-gradient(90deg, #00d9ff, #00ff88);
      border: none;
      border-radius: 50px;
      color: #1a1a2e;
      font-weight: bold;
      cursor: pointer;
    }
  `]
})
export class Practice implements OnInit {
  private questionService = inject(QuestionService);
  private router = inject(Router);
  
  questions: Question[] = [];
  currentIndex = 0;
  selectedAnswer: number | null = null;
  showResult = false;
  isCorrect = false;
  totalQuestions = 0;
  
  get currentQuestion(): Question | null {
    return this.questions[this.currentIndex] || null;
  }
  
  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(response => {
      this.questions = response.questions;
      this.totalQuestions = response.total;
    });
  }
  
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
  
  selectAnswer(index: number): void {
    if (!this.showResult) {
      this.selectedAnswer = index;
    }
  }
  
  submitAnswer(): void {
    if (this.selectedAnswer === null || !this.currentQuestion) return;
    
    this.questionService.submitAnswer(
      this.currentQuestion.id, 
      this.selectedAnswer
    ).subscribe(result => {
      this.isCorrect = result.correct;
      this.showResult = true;
    });
  }
  
  nextQuestion(): void {
    if (this.currentIndex + 1 >= this.totalQuestions) {
      this.router.navigate(['/results']);
    } else {
      this.currentIndex++;
      this.selectedAnswer = null;
      this.showResult = false;
    }
  }
  
  goHome(): void {
    this.router.navigate(['/home']);
  }
}
