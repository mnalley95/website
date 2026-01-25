/**
 * @jest-environment node
 */
import { POST } from '../route';

// Create a shared mock for the create method
const mockCreate = jest.fn();

// Mock OpenAI
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  }));
});

describe('POST /api/generate', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Set up environment variable
    process.env = { ...originalEnv, OPENAI_API_KEY: 'test-api-key' };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  it('returns completion for valid prompt', async () => {
    // Mock successful OpenAI response
    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: 'This is a test response from the AI.',
          },
        },
      ],
    });

    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'Test prompt' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('completion');
    expect(data.completion).toBe('This is a test response from the AI.');
    expect(mockCreate).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: expect.arrayContaining([
        expect.objectContaining({ role: 'system' }),
        expect.objectContaining({ role: 'user', content: 'Test prompt' }),
      ]),
    });
  });

  it('returns 400 error when prompt is missing', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('No prompt provided');
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('returns 400 error when prompt is empty string', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: '' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('No prompt provided');
  });

  it('returns 500 error when API key is not configured', async () => {
    // Remove API key from environment
    delete process.env.OPENAI_API_KEY;

    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'Test prompt' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('OpenAI API key not configured');
  });

  it('returns 500 error when OpenAI API fails', async () => {
    // Mock OpenAI error
    mockCreate.mockRejectedValue(
      new Error('OpenAI API error')
    );

    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'Test prompt' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('OpenAI API error');
  });

  it('logs the completion to console', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: 'Test response',
          },
        },
      ],
    });

    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'Test prompt' }),
    });

    await POST(request);

    expect(consoleSpy).toHaveBeenCalledWith('Test response');

    consoleSpy.mockRestore();
  });
});
