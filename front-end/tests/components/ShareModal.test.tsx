import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShareModal from '../../components/popups/SharePopup';
import '@testing-library/jest-dom';

window.React = React;

jest.mock('next-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key: string) => key,
  }),
}));

beforeAll(() => {
  global.open = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Given ShareModal is rendered, When the modal header is displayed, Then it should show the correct title', () => {
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={jest.fn()} />);
  expect(screen.getByText('shareModal.title')).toBeInTheDocument();
});

test('Given ShareModal is rendered, When the close button is displayed, Then it should show the correct close text', () => {
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={jest.fn()} />);
  expect(screen.getByText('shareModal.close')).toBeInTheDocument();
});

test('Given ShareModal is rendered, When the Facebook button is displayed, Then it should show the correct Facebook text', () => {
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={jest.fn()} />);
  expect(screen.getByText('shareModal.facebook')).toBeInTheDocument();
});

test('Given ShareModal is rendered, When the X button is displayed, Then it should show the correct X text', () => {
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={jest.fn()} />);
  expect(screen.getByText('shareModal.x')).toBeInTheDocument();
});

test('Given ShareModal is rendered, When the WhatsApp button is displayed, Then it should show the correct WhatsApp text', () => {
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={jest.fn()} />);
  expect(screen.getByText('shareModal.whatsapp')).toBeInTheDocument();
});

test('Given ShareModal is rendered, When the Facebook button is clicked, Then it should open the correct Facebook share URL', () => {
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={jest.fn()} />);
  fireEvent.click(screen.getByText('shareModal.facebook'));
  expect(global.open).toHaveBeenCalledWith(
    'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftest.com',
    '_blank',
    'width=600,height=400'
  );
});

test('Given ShareModal is rendered, When the Twitter button is clicked, Then it should open the correct Twitter share URL', () => {
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={jest.fn()} />);
  fireEvent.click(screen.getByText('shareModal.x'));
  expect(global.open).toHaveBeenCalledWith(
    'https://x.com/intent/post?url=https%3A%2F%2Ftest.com&text=Test%20Post',
    '_blank',
    'width=600,height=400'
  );
});

test('Given ShareModal is rendered, When the WhatsApp button is clicked, Then it should open the correct WhatsApp share URL', () => {
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={jest.fn()} />);
  fireEvent.click(screen.getByText('shareModal.whatsapp'));
  expect(global.open).toHaveBeenCalledWith(
    'https://wa.me/?text=Test%20Post%20https%3A%2F%2Ftest.com',
    '_blank',
    'width=600,height=400'
  );
});

test('Given ShareModal is rendered, When the close button is clicked, Then the onClose function should be triggered', () => {
  const onCloseMock = jest.fn();
  render(<ShareModal postTitle="Test Post" postUrl="https://test.com" onClose={onCloseMock} />);
  fireEvent.click(screen.getByText('shareModal.close'));
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});
