import React from 'react';


interface KeywordData {
  keyword: string; 
  mentions: number; 
  sentiment: string; 
  platform: string; 
}


interface TrendingThemesAndKeywordsProps {
  keywordsData: KeywordData[]; 
}

const TrendingThemesAndKeywords: React.FC<TrendingThemesAndKeywordsProps> = ({ keywordsData }) => {
  return (
    <div className="trending-themes-keywords">
      <h2>Trending Themes & Keywords</h2>
      <table>
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Number of Mentions</th>
            <th>Sentiment</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {keywordsData.map((keyword, index) => (
            <tr key={index}>
              <td>{keyword.keyword}</td>
              <td>{keyword.mentions}</td>
              <td>{keyword.sentiment}</td>
              <td>{keyword.platform}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendingThemesAndKeywords;
