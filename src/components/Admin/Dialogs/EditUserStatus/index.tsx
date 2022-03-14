import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { DialogTitleTypo } from 'src/components/ModalDialog/styles';
import { PrimaryButton } from 'src/components/Buttons/styles';
import CustomTextField from 'src/components/TextField';
import { AdminUsersItemType } from 'src/types/admin-table-data-types';

export interface ComponentProps {
    user2Edit: AdminUsersItemType;
    onClose: () => void;
}

const EditUserStatus: React.FC<ComponentProps> = ({ user2Edit, onClose }): JSX.Element => {
    const [userStatus, setUserStatus] = useState<'user' | 'admin' | 'ban'>('user');

    return (
        <Stack spacing={3} width={340}>
            <Stack alignItems="center">
                <DialogTitleTypo>Edit User Status</DialogTitleTypo>
            </Stack>
            <Box borderRadius={2} width={80} height={80} overflow="hidden" alignSelf="center">
                <img
                    src="/assets/images/avatar-template.png"
                    width="100%"
                    height="100%"
                    style={{ objectFit: 'cover' }}
                    alt=""
                />
            </Box>
            <CustomTextField title="USEN NICKNAME" inputValue={user2Edit.username} disabled />
            <CustomTextField title="USER ADDRESS" inputValue={user2Edit.address} disabled />
            <Stack spacing={0.5}>
                <Typography fontSize={12} fontWeight={700}>
                    STATUS
                </Typography>
                <Stack direction="row" spacing={1}>
                    <PrimaryButton
                        size="small"
                        fullWidth
                        btn_type={userStatus === 'user' ? 'primary' : 'secondary'}
                        onClick={() => setUserStatus('user')}
                    >
                        user
                    </PrimaryButton>
                    <PrimaryButton
                        size="small"
                        fullWidth
                        btn_type={userStatus === 'admin' ? 'primary' : 'secondary'}
                        onClick={() => setUserStatus('admin')}
                    >
                        admin
                    </PrimaryButton>
                    <PrimaryButton
                        size="small"
                        fullWidth
                        btn_type={userStatus === 'ban' ? 'primary' : 'secondary'}
                        onClick={() => setUserStatus('ban')}
                    >
                        ban
                    </PrimaryButton>
                </Stack>
            </Stack>
            <CustomTextField title="REMARKS" placeholder="Enter remarks" multiline rows={3} inputValue={user2Edit.remarks} />
            <Stack direction="row" spacing={2}>
                <PrimaryButton btn_type="secondary" fullWidth onClick={onClose}>
                    close
                </PrimaryButton>
                <PrimaryButton btn_type="pink" fullWidth>
                    Confirm
                </PrimaryButton>
            </Stack>
        </Stack>
    );
};

export default EditUserStatus;
