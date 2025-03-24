import { useEffect } from 'react';

type HookParameters = {
	isOpen: boolean;
	onCloseAction: () => void;
	containerRef: React.RefObject<HTMLElement>;
};

export function useClose(params: HookParameters) {
	useEffect(() => {
		const { isOpen, onCloseAction, containerRef } = params;
		if (!isOpen) return;

		const handleExternalInteraction = (event: MouseEvent | KeyboardEvent) => {
			if (event.type === 'mousedown') {
				const target = event.target as Node | null;
				const isOutside =
					containerRef.current &&
					target &&
					!containerRef.current.contains(target);
				isOutside && onCloseAction();
			}
		};

		const handleKeyboardEvent = (e: KeyboardEvent) => {
			e.key === 'Escape' && onCloseAction();
		};

		document.addEventListener('mousedown', handleExternalInteraction);
		document.addEventListener('keydown', handleKeyboardEvent);

		return () => {
			document.removeEventListener('mousedown', handleExternalInteraction);
			document.removeEventListener('keydown', handleKeyboardEvent);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.isOpen, params.onCloseAction, params.containerRef]);
}
