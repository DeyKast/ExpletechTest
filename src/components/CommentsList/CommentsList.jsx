export const CommentsList = ({ data, commentsState }) => {
  return (
    <>
      {!commentsState ? (
        <ul style={{ position: 'absolute', top: '0', left: '0' }}>
          {data.map(comment => (
            <li
              key={comment.id}
              style={{
                listStyle: 'none',
                marginBottom: '40px',
                marginRight: '40px',
                borderBottom: '1px solid lightgray',
              }}
            >
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {comment.name}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'gray',
                }}
              >
                {comment.email}
              </p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul
          style={{
            position: 'block',
            top: '350px',
            left: '0',
            zIndex: '20000000',
          }}
        >
          {data.map(comment => (
            <li
              key={comment.id}
              style={{
                listStyle: 'none',
                marginBottom: '40px',
                marginRight: '40px',
                borderBottom: '1px solid lightgray',
              }}
            >
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {comment.name}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'gray',
                }}
              >
                {comment.email}
              </p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
