import { TestBed } from '@angular/core/testing';
import { QuestionService, Question } from './question';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionService]
    });
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock questions', (done) => {
    service.getQuestions().subscribe(response => {
      expect(response.questions.length).toBeGreaterThan(0);
      expect(response.total).toBeGreaterThan(0);
      done();
    });
  });

  it('should have questions with required fields', (done) => {
    service.getQuestions().subscribe(response => {
      const question = response.questions[0];
      expect(question.id).toBeTruthy();
      expect(question.text).toBeTruthy();
      expect(question.options.length).toBeGreaterThan(0);
      expect(question.difficulty).toBeTruthy();
      done();
    });
  });

  it('should track current question index', (done) => {
    service.currentQuestionIndex$.subscribe(index => {
      if (index === 0) {
        service.nextQuestion();
      } else if (index === 1) {
        expect(index).toBe(1);
        done();
      }
    });
  });

  it('should reset practice state', (done) => {
    service.nextQuestion();
    service.nextQuestion();
    
    service.currentQuestionIndex$.subscribe(index => {
      if (index > 0) {
        service.resetPractice();
      }
    });
    
    setTimeout(() => {
      service.currentQuestionIndex$.subscribe(index => {
        expect(index).toBe(0);
        done();
      });
    }, 100);
  });
});
