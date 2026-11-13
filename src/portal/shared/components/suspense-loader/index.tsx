import { CircularProgress } from '@mui/material';

import { LoaderContainer, LoaderMessage } from './suspense-loader.styled';

interface SuspenseLoaderProps {
  message?: string;
}

const SuspenseLoader = ({ message }: SuspenseLoaderProps) => (
  <LoaderContainer>
    <CircularProgress size={32} />
    {message && <LoaderMessage variant="body2">{message}</LoaderMessage>}
  </LoaderContainer>
);

export default SuspenseLoader;
