import { Container, NewSelect, DownIcon, Label, Message } from './style';
import { components } from 'react-select';

//types
import { Props } from './type';

const MultiSelect = ({
	iconmargin,
	nooptionsmessage,
	icon,
	iconleft,
	iconright,
	icondowncolor,
	...props
}: Props) => {
	const DropdownIndicator = (props: any) => {
		return (
			<components.DropdownIndicator data-cy={props.dataCy} {...props}>
				{props.IconDown ? (
					props.IconDown
				) : (
					<DownIcon icondowncolor={icondowncolor} iconmargin={iconmargin} />
				)}
			</components.DropdownIndicator>
		);
	};

	const NoOptionsMessage = (props: any) => {
		return (
			<components.NoOptionsMessage data-cy={props.dataCy} {...props}>
				<span className='custom-css-class'>{nooptionsmessage}</span>
			</components.NoOptionsMessage>
		);
	};

	const ValueContainer = (props: any) => {
		return (
			components.ValueContainer && (
				<components.ValueContainer data-cy={props.dataCy} {...props}>
					{icon && (
						<div
							style={{ position: 'absolute', left: iconleft, right: iconright }}
						>
							{icon}
						</div>
					)}
					{props.children}
				</components.ValueContainer>
			)
		);
	};

	const customStyle = {
		menuPortal: (base: any) => ({ ...base, zIndex: 999999 }),
		control: (base: any, state: any) => ({
			...base,
			border: props.error
				? '1px solid #FF5E68'
				: props.selectStyle?.border
				? props.selectStyle?.border
				: '1px solid #C2C2C2',

			boxShadow: 'none',
			'&:hover': {
				border: 'inherite',
			},
			borderBottom: props.selectStyle?.borderbottom
				? props.selectStyle?.borderbottom
				: null,
			backgroundColor: props.selectStyle?.bgcolor
				? props.selectStyle?.bgcolor
				: 'white',
			borderRadius:
				props.selectStyle?.radius === 0
					? 0
					: props.selectStyle?.radius
					? `${props.selectStyle?.radius}px`
					: '14px',
		}),
		option: (base: any, state: any) => {
			return {
				...base,
				color: props.selectStyle?.color ? props.selectStyle?.color : '#223367',
				fontWeight: props.selectStyle?.weight
					? props.selectStyle?.weight
					: '500',
				backgroundColor: state.isSelected ? '#E8F0FE' : 'white',
			};
		},
	};

	//   console.log(props, "data cy ");

	return (
		<Container width={props.width} margin={props.margin}>
			{props.label ? (
				<Label
					htmlFor={props.label}
					labelStyle={props.labelStyle}
					focused={true}
					error={props.error}
					disabled={props.isDisabled}
					lmargin={props.lmargin}
				>
					{props.label}
				</Label>
			) : null}
			<NewSelect
				styles={customStyle}
				components={{ DropdownIndicator, NoOptionsMessage, ValueContainer }}
				inputId={props.label}
				selectStyle={props.selectStyle}
				defaultValue={props.defaultValue}
				value={props.defaultValue}
				data-cy={props.dataCy}
				{...props}
				{...props.field}
				placeholder={props.placeholder ? props.placeholder : ''}
				menuPortalTarget={document.body}
			/>
			{props.error ? (
				<Message labelStyle={props.labelStyle}>{props.message}</Message>
			) : null}
		</Container>
	);
};

export default MultiSelect;
