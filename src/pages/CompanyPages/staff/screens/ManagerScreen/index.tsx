import { useState } from 'react';
import { ManagerDiv, Text, Break, Wrap } from './style';
import { ReactComponent as EmptyManager } from 'assets/icons/manager_empty.svg';
import { ReactComponent as AddManager } from 'assets/icons/add_manager.svg';
import ManagerTable from '../../components/ManagerTable';
import useManagers from '../../hooks/useManagers';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import { useDebounce } from 'use-debounce/lib';
import { SpinnerDiv, EmptyContainer, EmptyLeft, EmptyRight } from '../../style';
import Spinner from 'components/Helpers/Spinner';
import Button from 'components/Custom/Button';
import { SideBar } from '../../components/SideBar';
import ManagerBar from './components/ManagerBar';
import CreateManager from './components/CreateManager';
import EditManager from './components/EditManager';
import { setOpenManager } from 'services/redux/Slices/staffs';

const ManagerScreen = () => {
	const openManager = useAppSelector((state) => state.staffs.openManager);
	const query = useAppSelector((state) => state.staffs.query);
	const managers = useAppSelector((state) => state.staffs.managers);
	const [isImg, setImg] = useState(false);
	const dispatch = useAppDispatch();
	console.log('managers', managers);

	const selectedManagers = useAppSelector(
		(state) => state.staffs.selectedManagers
	);
	const openEdit = useAppSelector((state) => state.staffs.openEditManager);

	const [period, setPeriod] = useState({
		startDate: '',
		endDate: '',
	});
	const [page, setPage] = useState('1');
	const [debouncedQuery] = useDebounce(query, 300);

	const { response } = useManagers({
		page: page,
		query: debouncedQuery,
		period,
	});

	return (
		<ManagerDiv>
			{response.isLoading ? (
				<SpinnerDiv>
					<Spinner />
				</SpinnerDiv>
			) : managers?.length > 0 ? (
				<Wrap>
					<ManagerTable
						managers={managers.map((manager: any) => {
							return {
								...manager,
								firstName: manager?.firstName + ' ' + manager?.lastName,
							};
						})}
					/>
				</Wrap>
			) : (
				<EmptyContainer>
					<EmptyLeft>
						<EmptyManager />
					</EmptyLeft>
					<EmptyRight>
						<Text>
							На данный момент менеджеры в компании отсутствуют. Добавьте
							менеджера, для большего контроля организации.
						</Text>
						<Break />
						<Button
							onClick={() => {
								dispatch(setOpenManager(true));
							}}
							startIcon={<AddManager />}
						>
							Добавить менеджера
						</Button>
					</EmptyRight>
				</EmptyContainer>
			)}

			<SideBar maxWidth='340px' isOpen={selectedManagers?.length}>
				<ManagerBar />
			</SideBar>

			{/* create new manager */}
			<CreateManager openManager={openManager} />

			{/* edit manager */}
			<EditManager openEdit={openEdit} />
		</ManagerDiv>
	);
};

export default ManagerScreen;
