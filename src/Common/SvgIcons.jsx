export const Icons = {
  arrow: ({ strokeColor, width, height, ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        d="M5.375 4.375L7.125 6L5.375 7.625"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  search: ({ strokeColor, width, height, ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M16.0417 16.0417L12.9167 12.9167M3.95833 9.16667C3.95833 6.29019 6.29018 3.95834 9.16666 3.95834C12.0431 3.95834 14.375 6.29019 14.375 9.16667C14.375 12.0432 12.0431 14.375 9.16666 14.375C6.29018 14.375 3.95833 12.0432 3.95833 9.16667Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  downloadIcon: ({ strokeColor, width, height, ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M3.16663 9.83333V10.8333C3.16663 11.9379 4.06206 12.8333 5.16663 12.8333H10.8333C11.9379 12.8333 12.8333 11.9379 12.8333 10.8333V9.83333M7.99996 9.5V3.16666M7.99996 9.5L5.83329 7.16666M7.99996 9.5L10.1666 7.16666"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  elipsis: ({ strokeColor, width, height, ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M10.4166 5.83333C10.4166 6.06345 10.2301 6.25 9.99998 6.25C9.76986 6.25 9.58331 6.06345 9.58331 5.83333C9.58331 5.60321 9.76986 5.41666 9.99998 5.41666C10.2301 5.41666 10.4166 5.60321 10.4166 5.83333Z"
        stroke={strokeColor}
      />
      <path
        d="M10.4166 10C10.4166 10.2301 10.2301 10.4167 9.99998 10.4167C9.76986 10.4167 9.58331 10.2301 9.58331 10C9.58331 9.76988 9.76986 9.58333 9.99998 9.58333C10.2301 9.58333 10.4166 9.76988 10.4166 10Z"
        stroke={strokeColor}
      />
      <path
        d="M10.4166 14.1667C10.4166 14.3968 10.2301 14.5833 9.99998 14.5833C9.76986 14.5833 9.58331 14.3968 9.58331 14.1667C9.58331 13.9365 9.76986 13.75 9.99998 13.75C10.2301 13.75 10.4166 13.9365 10.4166 14.1667Z"
        stroke={strokeColor}
      />
    </svg>
  ),
};
