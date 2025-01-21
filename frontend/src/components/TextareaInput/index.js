import TextareaAutosize from '@mui/material/TextareaAutosize'
import { styled } from '@mui/system'

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  'minWidth': '320px',
  'maxHeight': '200px',
  'lineHeight': '1.25',
  padding: '12px',
  borderRadius: '12px',
  color: theme?.palette.text.main,
  background: theme?.palette.mode === 'dark' ? theme.palette.secondary.dark : '#fff',
  border: `1px solid ${theme?.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light}`,
  '&:hover': {
    backgroundColor: '#EAEAEA',
  },
  '&:focus-visible': {
    outline: '0',
    color: theme.palette.text.main,
  },
}))

export default function UnstyledTextareaIntroduction(props) {
  const placeholder = props.placeholder || 'Description*'
  return <StyledTextareaAutosize placeholder={placeholder} {...props} />
}
