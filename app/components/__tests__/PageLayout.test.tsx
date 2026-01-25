import { render, screen } from '@testing-library/react';
import Layout, { siteTitle, myName } from '../PageLayout';

// Mock next/script
jest.mock('next/script', () => {
  return function MockScript(props: any) {
    return <script {...props} />;
  };
});

describe('Layout Component', () => {
  it('exports correct siteTitle', () => {
    expect(siteTitle).toBe('Mark Nalley');
  });

  it('exports correct myName', () => {
    expect(myName).toBe('Mark Nalley');
  });

  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header with name', () => {
    render(<Layout><div /></Layout>);

    expect(screen.getByText('Mark Nalley')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Layout><div /></Layout>);

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/#about');

    const projectsLink = screen.getByText('Projects');
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute('href', '/#projects');

    const experienceLink = screen.getByText('Experience');
    expect(experienceLink).toBeInTheDocument();
    expect(experienceLink).toHaveAttribute('href', '/#experience');

    const contactLink = screen.getByText('Contact');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/#contact');
  });

  it('renders Google Analytics scripts', () => {
    const { container } = render(<Layout><div /></Layout>);

    const scripts = container.querySelectorAll('script');
    const gaScripts = Array.from(scripts).filter(script =>
      script.src.includes('googletagmanager') || script.id === 'google-analytics'
    );

    expect(gaScripts.length).toBeGreaterThan(0);
  });

  it('shows "Back to home" link when home prop is false', () => {
    render(
      <Layout home={false}>
        <div />
      </Layout>
    );

    expect(screen.getByText('← Back to home')).toBeInTheDocument();
  });

  it('does not show "Back to home" link when home prop is true', () => {
    render(
      <Layout home={true}>
        <div />
      </Layout>
    );

    expect(screen.queryByText('← Back to home')).not.toBeInTheDocument();
  });

  it('renders footer', () => {
    const { container } = render(<Layout><div /></Layout>);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders main element with children', () => {
    const { container } = render(
      <Layout>
        <div data-testid="main-content">Main Content</div>
      </Layout>
    );

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });
});
