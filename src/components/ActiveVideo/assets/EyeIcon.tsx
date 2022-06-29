import { h, FunctionComponent } from 'preact'

export const EyeIcon: FunctionComponent = () => {
  return (
    <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.736 15.578c.028-.09 3.087-8.912 13.264-8.912s13.236 8.823 13.265 8.912l.14.421-.14.422c-.029.089-3.088 8.912-13.265 8.912S2.764 16.51 2.735 16.42l-.14-.422.141-.421Zm2.696.421c.67 1.539 3.433 6.667 10.568 6.667 7.13 0 9.896-5.123 10.568-6.667-.67-1.538-3.433-6.666-10.568-6.666-7.13 0-9.896 5.122-10.568 6.666ZM12 16c0-2.188 1.81-4 4-4 2.188 0 4 1.812 4 4 0 2.19-1.812 4-4 4-2.19 0-4-1.81-4-4Z"
        fill="#2B2D33"
      />
    </svg>
  )
}
