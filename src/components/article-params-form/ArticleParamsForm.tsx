import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select'; // Импорт Select из папки ui
import { Text } from 'src/ui/text'; // Импорт Text из папки ui
import { Separator } from 'src/ui/separator'; // Импорт Separator из папки ui
import { RadioGroup } from 'src/ui/radio-group'; // Импорт RadioGroup из папки ui
import { useClose } from 'src/hooks/useClose'; // Импорт кастомного хука для закрытия формы

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type Props = {
	onSubmit: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit }: Props) => {
	const [formVisible, setFormVisibility] = useState(false);
	const formContainer = useRef<HTMLFormElement>(null);
	const [currentParams, updateParams] =
		useState<ArticleStateType>(defaultArticleState);

	useClose({
		isOpen: formVisible,
		onCloseAction: () => setFormVisibility(false),
		containerRef: formContainer,
	});

	const toggleFormVisibility = () => setFormVisibility((prev) => !prev);

	const applyChanges = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(currentParams);
	};

	const revertToDefaults = () => {
		updateParams(defaultArticleState);
		onSubmit(defaultArticleState);
	};

	const updateFontFamily = (newOption: OptionType) => {
		updateParams((prev) => ({ ...prev, fontFamilyOption: newOption }));
	};

	const adjustFontSize = (selectedOption: OptionType) => {
		updateParams((prev) => ({ ...prev, fontSizeOption: selectedOption }));
	};

	const changeFontColor = (colorOption: OptionType) => {
		updateParams((prev) => ({ ...prev, fontColor: colorOption }));
	};

	const setBgColor = (colorOption: OptionType) => {
		updateParams((prev) => ({ ...prev, backgroundColor: colorOption }));
	};

	const setContainerWidth = (widthOption: OptionType) => {
		updateParams((prev) => ({ ...prev, contentWidth: widthOption }));
	};

	const sidebarClasses = clsx(styles.container, {
		[styles.container_open]: formVisible,
	});

	return (
		<>
			<ArrowButton isOpen={formVisible} onClick={toggleFormVisibility} />
			<aside className={sidebarClasses}>
				<form
					ref={formContainer}
					className={styles.form}
					onSubmit={applyChanges}
					onReset={revertToDefaults}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<RadioGroup
						name={currentParams.fontSizeOption.className}
						options={fontSizeOptions}
						selected={currentParams.fontSizeOption}
						onChange={adjustFontSize}
						title='Размер шрифта'
					/>
					<Select
						onChange={updateFontFamily}
						selected={currentParams.fontFamilyOption}
						placeholder='Open Sans'
						title='Шрифт'
						options={fontFamilyOptions}
					/>
					<Select
						onChange={changeFontColor}
						selected={currentParams.fontColor}
						placeholder={currentParams.fontColor.title}
						title='Цвет шрифта'
						options={fontColors}
					/>
					<Separator />
					<Select
						onChange={setBgColor}
						selected={currentParams.backgroundColor}
						placeholder={currentParams.backgroundColor.title}
						title='Цвет фона'
						options={backgroundColors}
					/>
					<Select
						onChange={setContainerWidth}
						selected={currentParams.contentWidth}
						placeholder={currentParams.contentWidth.title}
						title='Ширина контента'
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
