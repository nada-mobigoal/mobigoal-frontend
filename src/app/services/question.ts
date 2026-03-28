import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  explanation?: string;
}

export interface QuestionResponse {
  questions: Question[];
  total: number;
}

export interface AnswerResult {
  questionId: string;
  selectedAnswer: number;
  correct: boolean;
  explanation?: string;
}

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private http = inject(HttpClient);
  private apiUrl = 'https://mobigoal-api.workers.dev'; // TODO: Update when backend ready

  private currentQuestionIndex = new BehaviorSubject<number>(0);
  private answers = new BehaviorSubject<AnswerResult[]>([]);

  currentQuestionIndex$ = this.currentQuestionIndex.asObservable();
  answers$ = this.answers.asObservable();

  getQuestions(topic?: string, difficulty?: string): Observable<QuestionResponse> {
    // TODO: Connect to real API when ready
    // return this.http.get<QuestionResponse>(`${this.apiUrl}/questions`, { params: { topic, difficulty } });
    
    // Mock data for development
    return this.getMockQuestions();
  }

  submitAnswer(questionId: string, selectedAnswer: number): Observable<{ correct: boolean; explanation: string }> {
    // TODO: Connect to real API when ready
    // return this.http.post<{ correct: boolean; explanation: string }>(`${this.apiUrl}/answers`, { questionId, selectedAnswer });

    // Mock response
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next({ correct: selectedAnswer === 2, explanation: 'Mock explanation' });
        subscriber.complete();
      }, 300);
    });
  }

  nextQuestion(): void {
    this.currentQuestionIndex.next(this.currentQuestionIndex.value + 1);
  }

  getResults(): AnswerResult[] {
    return this.answers.value;
  }

  resetPractice(): void {
    this.currentQuestionIndex.next(0);
    this.answers.next([]);
  }

  private getMockQuestions(): Observable<QuestionResponse> {
    const mockQuestions: Question[] = [
      {
        id: '1',
        text: 'What is the value of x if 2x + 5 = 15?',
        options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 4'],
        correctAnswer: 0,
        difficulty: 'easy',
        topic: 'Math',
        explanation: '2x + 5 = 15 → 2x = 10 → x = 5'
      },
      {
        id: '2',
        text: 'Which word is a synonym of "ephemeral"?',
        options: ['Permanent', 'Fleeting', 'Ancient', 'Solid'],
        correctAnswer: 1,
        difficulty: 'medium',
        topic: 'Vocabulary',
        explanation: 'Ephemeral means lasting for a very short time.'
      },
      {
        id: '3',
        text: 'What is the main idea of the passage?',
        options: [
          'The history of transportation',
          'The impact of technology on daily life',
          'The importance of walking',
          'The future of cities'
        ],
        correctAnswer: 1,
        difficulty: 'hard',
        topic: 'Reading Comprehension',
        explanation: 'The passage discusses how technology has transformed everyday activities.'
      }
    ];

    return new Observable(subscriber => {
      subscriber.next({ questions: mockQuestions, total: mockQuestions.length });
      subscriber.complete();
    });
  }
}
