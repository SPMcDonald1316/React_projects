import { Container } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const posts = [
    {
      id: 1,
      text: 'Hello, world!',
      timestamp: 'a minute ago',
      author: {
      username: 'susan',
      },
    },
    {
      id: 2,
      text: 'Second post',
      timestamp: 'an hour ago',
      author: {
        username: 'john',
      },
    },
  ];

  return (
    <Container fluid className='App'>
      <Header />
      <Container>
        <Stack direction='horizontal'>
          <Sidebar />
          <Container>
            {posts.length === 0 ?
              <p>There are no blog posts.</p>
            :
              posts.map(post => {
                return (
                  <p key={post.id}>
                    <b>{post.author.username}</b> &mdash; {post.timestamp}
                    <br />
                  </p>
                );
              })
            }
          </Container>
        </Stack>
      </Container>
    </Container>
  );
}

export default App
