import { ReduceTextPipe } from "./reduce-text.pipe";

describe('reduce-text.pipe', () =>{

  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call pipe.transform and reduce text', () => {

    const text = 'Hello world';
    const newText = pipe.transform(text, 5);
    expect(newText.length).toBe(5);

  });


});
