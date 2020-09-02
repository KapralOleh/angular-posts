import { TruncatePipe } from './truncate.pipe';

describe('#TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#transform', () => {
    it('should call transform method', () => {
      const result = pipe.transform('string', [5, '..']);

      expect(result).toEqual('strin..');
    });

    it('should call transform method', () => {
      const result = pipe.transform('string', [5]);

      expect(result).toEqual('strin...');
    });

    it('should call transform method', () => {
      const result = pipe.transform('string string string string', []);

      expect(result).toEqual('string string string...');
    });
  });
});
