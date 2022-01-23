import { numberWith } from 'services/utils';
import {
  AddInfo,
  BreakLine,
  Container,
  InfoBlock,
  InfoItem,
  InfoWrapper,
  NoteBlock,
  Wrapper,
} from './style';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import Button from 'components/Custom/Buttons/Button';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Recommendation } from '../../Recommendations';
import { getClientStatistics } from 'pages/CompanyPages/clients/utils/getSelectedFilters';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import { NoteModal } from '../../NoteModal';
import { setNote } from 'services/redux/Slices/clients';
import { useMutation } from 'react-query';
import { sendNote } from 'services/queries/clientsQuery';
import Modal from 'components/Custom/Modal';
import { StatsCard } from '../../StatsCard';
const referTypes: any = {
  1: 'client',
  2: 'partner_admin',
  3: 'cashier',
  4: 'manager',
  5: 'worker',
};
const Information = () => {
  const { t } = useTranslation();
  const { currentClient } = useAppSelector((state) => state.clients);
  const dispatch = useAppDispatch();
  const [noteState, setNoteState] = useState({
    value: currentClient?.clientInfo.notes + '',
    open: false,
  });
  const client = currentClient?.clientInfo;
  const statistics = getClientStatistics(currentClient?.clientInfo.addInfo);
  const { width } = useWindowWidth();
  const refetch = () => {
    dispatch(setNote(noteState.value));
  };
  const { mutate } = useMutation((data: any) => sendNote(data));

  const handleSendNote = () => {
    if (client?.id) {
      mutate({
        clientId: client.id,
        notes: noteState.value,
      });
    }
  };
  return (
    <Container>
      {width <= 600 && (
        <FullModal open={noteState.open}>
          <NoteModal
            config={{
              setNote: setNoteState,
              refetch,
              note: noteState,
              handleSendNote,
            }}
          />
        </FullModal>
      )}
      {width <= 1000 && width > 600 && (
        <Modal open={noteState.open}>
          <NoteModal
            config={{
              setNote: setNoteState,
              refetch,
              note: noteState,
              handleSendNote,
            }}
          />
        </Modal>
      )}
      <Wrapper>
        {width <= 1000 && width > 600 ? (
          <div className='statistics'>
            {getClientStatistics(client?.addInfo)?.map((el, index) => (
              <StatsCard key={index} {...el} />
            ))}
          </div>
        ) : (
          <>
            {statistics.map((el, index) => (
              <InfoItem>
                <span>{el?.heading}</span>
                <p>{numberWith(el?.value?.toString(), ' ')}</p>
                {index !== statistics.length - 1 && <BreakLine />}
              </InfoItem>
            ))}
          </>
        )}
      </Wrapper>
      <AddInfo>
        <InfoWrapper>
          <InfoBlock>
            <h4>{t('info')}</h4>
            <div>
              {currentClient?.referBy && (
                <p>
                  {t('byRecommendation')}:{' '}
                  <span>{currentClient?.referBy.name}</span>(
                  {t(referTypes[currentClient?.referBy.type])})
                </p>
              )}
              <p>
                {t('lastPurchase')}:{' '}
                {client?.addInfo?.lastPurchaseDate
                  ? dayjs(client?.addInfo?.lastPurchaseDate).format(
                      'DD.MM.YYYY'
                    )
                  : '-'}
              </p>
            </div>
            {
              <Button
                onClick={() =>
                  setNoteState((prev: any) => ({ ...prev, open: true }))
                }
                margin={{ mobile: '7px 0 0 0' }}
                buttonStyle={{
                  bgcolor: 'rgba(96, 110, 234, 0.1);',
                  color: '#3492FF',
                }}
              >
                {client?.notes ? t('editNote') : t('addNote') + ' +'}
              </Button>
            }
          </InfoBlock>
          {client?.notes && width <= 600 && (
            <NoteBlock>
              <h4>{t('noteAboutClient')}</h4>
              <p>{client?.notes}</p>
            </NoteBlock>
          )}
        </InfoWrapper>
        <Recommendation
          maxWidth='none'
          referLevels={currentClient?.childReferalClientsByLevel || []}
        />
      </AddInfo>
      {client?.notes && width <= 1000 && width > 600 && (
        <NoteBlock>
          <h4>{t('noteAboutClient')}</h4>
          <p>{client?.notes}</p>
        </NoteBlock>
      )}
    </Container>
  );
};

export default Information;
