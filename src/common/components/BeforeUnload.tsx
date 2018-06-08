import * as React from 'react';

export interface IBeforeUnloadProps {
	shouldWarn: (event: BeforeUnloadEvent) => boolean;
}

class BeforeUnload extends React.Component<IBeforeUnloadProps> {
	public componentDidMount() {
		window.addEventListener("beforeunload", this.handleBeforeUnload);
	}

	public componentWillUnmount() {
		window.removeEventListener("beforeunload", this.handleBeforeUnload);
	}

	public handleBeforeUnload = (event: BeforeUnloadEvent): string | void => {
		const { shouldWarn } = this.props;
		
		if (shouldWarn && shouldWarn(event)) {
			// Custom messages are not actually supported in most browsers anymore,
			// so no point in returning a custom message
			return (event.returnValue = "Changes you made may not be saved.");
		}

		return void 0;
	}

	public render() {
		return null;
	}
};

export default BeforeUnload;