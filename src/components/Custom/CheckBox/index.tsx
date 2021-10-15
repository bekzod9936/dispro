import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Container } from './style';

interface Props {
	id?: string;
	onChange?: (e: any) => void;
	name?: string;
	label?: any;
	checked?: boolean;
	checkedIcon?: any;
	disabled?: boolean;
	required?: boolean;
	labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
	value?: any;
	ref?: any;
}

const CheckBox = ({
	onChange = () => {},
	name,
	label,
	labelPlacement,
	checked,
	ref,
	disabled,
}: Props) => {
	const [ state, setState ] = useState(disabled || checked);
	const handleChange = (e: any) => {
		if (disabled) {
			return;
		}
		onChange(e);
		setState(e.target.checked);
	};

	return (
		<Container>
			<FormControlLabel
				control={
					<Checkbox
						disabled={disabled}
						ref={ref}
						checked={state}
						onChange={handleChange}
						name={name}
					/>
				}
				labelPlacement={labelPlacement}
				label={label}
			/>
		</Container>
	);
};

export default CheckBox;
