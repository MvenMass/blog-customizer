import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const [appStyles, setAppStyles] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appStyles.fontFamilyOption.value,
					'--font-size': appStyles.fontSizeOption.value,
					'--font-color': appStyles.fontColor.value,
					'--bg-color': appStyles.backgroundColor.value,
					'--container-width': appStyles.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={setAppStyles} />
			<Article />
		</div>
	);
};
