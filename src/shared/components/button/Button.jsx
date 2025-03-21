import styled, { css } from 'styled-components'

export default function Button({
  children,
  variant = 'primary',
  isFullWidth = false,
  disabled = false,
  onClick,
  ...props
}) {
  return (
    <StyledButton
      $variant={variant}
      $isFullWidth={isFullWidth}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

const variantStyles = {
  primary: css`
    background: var(--main);
    &:hover {
      background: #7422c1;
    }
  `,
  secondary: css`
    background: var(--point-yellow);
    &:hover {
      background: #ffb200;
    }
  `,
  danger: css`
    background: var(--point-red);
    &:hover {
      background: #d92722;
    }
  `,
}

const StyledButton = styled.button`
  ${({ $variant }) => variantStyles[$variant]};
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 0.8rem;
  text-align: center;
  line-height: 2.2rem;
  color: var(--box-container, #fff);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:disabled {
    background: var(--point-gray);
    color: var(--font-sub);
    cursor: not-allowed;
  }
`
