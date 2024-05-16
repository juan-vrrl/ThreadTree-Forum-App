import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import ThreadsList from '../components/ThreadList';
import ThreadSearch from '../components/ThreadSearch';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncAddThread,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralvoteThread,
} from '../states/threads/action';
import ThreadFilter from '../components/ThreadFilter';
import useInput from '../hooks/useInput';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSearch = searchParams.get('search');
  const [search, setSearch] = useState(defaultSearch || '');
  const [filter, onFilterChange] = useInput('');
  let categories = [];
  const dispatch = useDispatch();

  if (threads) {
    const categorySet = new Set(threads.map((thread) => thread.category));
    categories = [...categorySet];
  }

  const onSearchChangeHandler = (Search) => {
    setSearch(Search);
    setSearchParams({ Search });
  };

  const onAddThread = (title, body, category) => {
    const updatedCategory = `#${category}`;
    const data = {
      title,
      body,
      updatedCategory,
    };
    dispatch(asyncAddThread(data));
  };

  const onUpVote = (id) => {
    dispatch(asyncToggleUpvoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncToggleDownvoteThread(id));
  };

  const onNeutralVote = (id) => {
    dispatch(asyncToggleNeutralvoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const filteredThread = threadList.filter((thread) => {
    const titleMatch = thread.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = !filter || thread.category === filter;
    return titleMatch && categoryMatch;
  });

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  return (
    <section className="home-page">
      <ThreadInput addThread={onAddThread} />
      <ThreadSearch search={search} searchChange={onSearchChangeHandler} />
      <ThreadFilter categories={categories} filter={filter} filterChange={onFilterChange} />
      <ThreadsList
        threads={filteredThread}
        upVote={onUpVote}
        downVote={onDownVote}
        neutralVote={onNeutralVote}
      />
    </section>
  );
}

export default HomePage;
