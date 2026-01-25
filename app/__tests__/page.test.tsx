import { render, screen } from '@testing-library/react';
import Home, { metadata } from '../page';

// Mock the Layout component
jest.mock('../components/PageLayout', () => {
  return function MockLayout({ children, home }: { children: React.ReactNode, home?: boolean }) {
    return <div data-testid="layout" data-home={home}>{children}</div>;
  };
});

// Mock the ParticleBackground component
jest.mock('../components/ParticleBackground', () => {
  return function MockParticleBackground() {
    return <div data-testid="particle-background" />;
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('has correct metadata', () => {
    expect(metadata).toBeDefined();
    expect(metadata).toHaveProperty('title');
  });

  it('renders the ParticleBackground component', () => {
    render(<Home />);
    expect(screen.getByTestId('particle-background')).toBeInTheDocument();
  });

  it('renders the headshot image', () => {
    render(<Home />);
    const image = screen.getByAltText('My headshot');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/headshot.jpg');
  });

  it('renders all main sections', () => {
    render(<Home />);

    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders Noteraity project link', () => {
    render(<Home />);
    const noteraityLink = screen.getByText('Noteraity');
    expect(noteraityLink).toBeInTheDocument();
    expect(noteraityLink).toHaveAttribute('href', 'https://noteraity.com');
  });

  it('renders contact links', () => {
    render(<Home />);

    const linkedinLink = screen.getByText('LinkedIn');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/marknalley/');

    const emailLink = screen.getByText('Email');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:mnalley95@gmail.com');

    const githubLink = screen.getByText('Github');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/mnalley95');
  });

  it('passes home prop to Layout component', () => {
    render(<Home />);
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-home', 'true');
  });
});
