import { useState } from 'react';
import './App.css';

import { DREAM_DICTIONARY } from './data/dreamDictionary.js';
import { CATEGORIES } from './data/categories.js';

import AppHeader from './components/AppHeader.jsx';
import AppFooter from './components/AppFooter.jsx';
import DreamInput from './components/DreamInput.jsx';
import CategoryGrid from './components/CategoryGrid.jsx';
import SearchBox from './components/SearchBox.jsx';
import DreamList from './components/DreamList.jsx';
import DreamDetail from './components/DreamDetail.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import FavoritesPanel from './components/FavoritesPanel.jsx';

import { useDreamSearch } from './hooks/useDreamSearch.js';
import { useDreamHistory } from './hooks/useDreamHistory.js';
import { useFavorites } from './hooks/useFavorites.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [categoryId, setCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [detailDream, setDetailDream] = useState(null);

  const { history, addHistory, removeHistory, clearHistory } = useDreamHistory();
  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites();

  const { results } = useDreamSearch(DREAM_DICTIONARY, searchQuery, categoryId);
  const currentCategory = CATEGORIES.find(c => c.id === categoryId);

  const handleCategorySelect = (id) => {
    setCategoryId(id);
    setActiveTab('home');
  };

  const handleInputSubmit = (text) => {
    setSearchQuery(text);
    addHistory(text);
  };

  const handleHistorySelect = (query) => {
    setInputText(query);
    setSearchQuery(query);
    setActiveTab('home');
  };

  const handleDreamSelect = (dream) => {
    setDetailDream(dream);
    const query = inputText.trim() || searchQuery.trim();
    if (query) {
      addHistory(query, dream.id);
    }
  };

  const showResults = searchQuery.trim() !== '' || categoryId !== null;

  return (
    <div className="app">
      <AppHeader />

      <nav className="tab-nav">
        <button
          type="button"
          className={`tab-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          首页解梦
        </button>
        <button
          type="button"
          className={`tab-nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          我的收藏
          {favorites.length > 0 && <span className="tab-badge">{favorites.length}</span>}
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'home' && (
          <>
            <DreamInput
              value={inputText}
              onChange={setInputText}
              onSubmit={handleInputSubmit}
            />

            <CategoryGrid
              onSelect={handleCategorySelect}
              onShowAll={() => setCategoryId(null)}
            />

            <SearchBox value={searchQuery} onChange={setSearchQuery} />

            {showResults && (
              <div className="results-section">
                {currentCategory && (
                  <h2 className="section-title">
                    {currentCategory.icon} {currentCategory.name}类梦境
                  </h2>
                )}
                {searchQuery && !currentCategory && (
                  <h2 className="section-title">搜索结果</h2>
                )}
                <DreamList
                  items={results}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onSelect={handleDreamSelect}
                  emptyHint={searchQuery ? '未找到相关解梦，换个关键词试试' : '该分类下暂无内容'}
                />
              </div>
            )}

            {!showResults && (
              <HistoryPanel
                history={history}
                onSelect={handleHistorySelect}
                onRemove={removeHistory}
                onClear={clearHistory}
              />
            )}
          </>
        )}

        {activeTab === 'favorites' && (
          <FavoritesPanel
            favorites={favorites}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onSelect={handleDreamSelect}
            onClear={clearFavorites}
          />
        )}
      </main>

      <AppFooter />

      {detailDream && (
        <DreamDetail
          dream={detailDream}
          isFavorite={isFavorite(detailDream.id)}
          onToggleFavorite={() => toggleFavorite(detailDream)}
          onClose={() => setDetailDream(null)}
        />
      )}
    </div>
  );
}
