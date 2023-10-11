import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

interface StyledTextareaAutosizeProps {
  'aria-label': string;
  placeholder: string;
}

const StyledTextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  min-width: 320px;
  max-height: 200px;
  line-height: 1.25;
  padding: 12px;
  border-radius: 12px 12px 12px 12px;
  color: ${theme.palette.text.main};
  background: ${theme.palette.mode === 'dark' ? theme.palette.secondary.dark : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light};

  &:hover {
    background-color: #EAEAEA;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
  `,
);

export default function UnstyledTextareaIntroduction({
  placeholder = "Description*",
  ...props
}: StyledTextareaAutosizeProps) {
  return <StyledTextareaAutosize placeholder={placeholder} {...props} />;
}
