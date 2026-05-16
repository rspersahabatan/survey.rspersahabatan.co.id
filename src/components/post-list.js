import React from "react";
import styled from "styled-components";

const resolveMediaPath = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const match = path.match(/static\/(.+)$/);
  if (match) return `/${match[1]}`;
  return path.startsWith("/") ? path : `/${path}`;
};

const PostList = ({ posts }) => {
  const PostList = posts.map(({ frontmatter, fields, excerpt, timeToRead }) => {
    const { title, tags, date, description, tujuan, social_image } = frontmatter;
    const { slug } = fields;

    return (
      <PostListItem
        key={slug}
        tags={tags}
        title={title}
        tujuan={tujuan}
        socialImage={resolveMediaPath(social_image)}
        date={date}
        slug={slug}
        timeToRead={timeToRead}
        description={description}
        excerpt={excerpt}
      />
    );
  });

  return <StyledPostList>{PostList}</StyledPostList>;
};

export default PostList;

const PostListItem = ({
  title,
  tujuan,
  socialImage,
  excerpt,
  description,
}) => {
  return (
    <StyledPostListItem
      href={tujuan}
      target="_blank"
      rel="noreferrer"
      data-umami-event={`survey-${title.replace(/ +/g, "-")}`}
    >
      <PostListTitle>{title}</PostListTitle>

      {socialImage && <PostImage src={socialImage} alt={title} />}

      <PostListExcerpt
        dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
      />
    </StyledPostListItem>
  );
};

const StyledPostList = styled.ul`
  padding: 0;
  list-style: none;
  display: grid;
  justify-items: stretch;

  grid-gap: var(--size-600);
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPostListItem = styled.a`
  display: flex;
  padding: 1.5rem;
  border-radius: 8px;
  position: relative;
  flex-direction: column;
  transition: all 0.3s ease-out;
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  body.light-mode &,
  [data-theme="light"] & {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 2px solid #ffffff;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  body.light-mode &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  body.dark-mode & {
    background-color: #3b3b3c;
    border: 1px solid #515151;
  }

  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-600);
    }
  }
`;

const PostListTitle = styled.h2`
  line-height: 1.2;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  font-size: var(--size-600);
  font-weight: 700;
`;

const PostImage = styled.img`
  display: block;
  width: 100%;
  max-width: 320px;
  height: auto;
  margin: 0 auto;
  border-radius: 4px;
  background-color: #ffffff;
`;

const PostListExcerpt = styled.p`
  padding-top: var(--size-400);
`;
