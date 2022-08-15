import { BN, Program } from '@heavy-duty/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { DrillBounty, DrillBountyVault, DrillResponse } from 'types/drill';

import { Drill } from 'utils/drill';
import { getAccount } from '@solana/spl-token';
import { getProgram } from 'utils/drill/get-program';

const boardId = parseInt(process.env.BOARD_ID);
const rpcEndpoint = process.env.RPC_ENDPOINT;

const getBoardPublicKey = async (programId: PublicKey) => {
    const [boardPublicKey] = await PublicKey.findProgramAddress(
        [
            Buffer.from('board', 'utf8'),
            new BN(boardId).toArrayLike(Buffer, 'le', 4),
        ],
        programId,
    );

    return boardPublicKey;
};

const getBountyPublicKey = async (
    bountyId: number,
    boardPublicKey: PublicKey,
    programId: PublicKey,
) => {
    const [bountyPublicKey] = await PublicKey.findProgramAddress(
        [
            Buffer.from('bounty', 'utf8'),
            boardPublicKey.toBuffer(),
            new BN(bountyId).toArrayLike(Buffer, 'le', 4),
        ],
        programId,
    );

    return bountyPublicKey;
};

const getBountyVaultPublicKey = async (
    bountyId: number,
    boardPublicKey: PublicKey,
    programId: PublicKey,
) => {
    const bountyPublicKey = await getBountyPublicKey(
        bountyId,
        boardPublicKey,
        programId,
    );

    const [bountyVaultPublicKey] = await PublicKey.findProgramAddress(
        [Buffer.from('bounty_vault', 'utf8'), bountyPublicKey.toBuffer()],
        new PublicKey(programId),
    );

    return bountyVaultPublicKey;
};

const getDrillBounty = async (
    bountyId: number,
    program: Program<Drill>,
): Promise<DrillBounty | null> => {
    const programId = program.programId;

    const boardPublicKey = await getBoardPublicKey(programId);

    const bountyPublicKey = await getBountyPublicKey(
        bountyId,
        boardPublicKey,
        programId,
    );

    const bountyAccount = await program.account.bounty.fetchNullable(
        bountyPublicKey,
    );

    if (!bountyAccount) {
        return null;
    }

    return {
        boardId: bountyAccount.boardId,
        bountyBump: bountyAccount.bountyBump,
        bountyHunter: bountyAccount.bountyHunter,
        bountyVaultBump: bountyAccount.bountyVaultBump,
        closedAt: bountyAccount.closedAt
            ? new Date(bountyAccount.closedAt.toNumber() * 1000)
            : null,
        id: bountyAccount.bountyId,
        isClosed: bountyAccount.isClosed,
        publicKey: bountyPublicKey,
    };
};

const getDrillBountyVault = async (
    bountyId: number,
    program: Program<Drill>,
    connection: Connection,
): Promise<DrillBountyVault> => {
    const programId = program.programId;

    const boardPublicKey = await getBoardPublicKey(programId);

    const bountyVaultPublicKey = await getBountyVaultPublicKey(
        bountyId,
        boardPublicKey,
        programId,
    );

    return getAccount(connection, bountyVaultPublicKey);
};

const getDrillResponse = async (
    bountyId: number,
): Promise<DrillResponse | null> => {
    const connection = new Connection(rpcEndpoint);
    const program = getProgram(connection);
    const bounty = await getDrillBounty(bountyId, program);

    if (!bounty) return null;

    const bountyVault = await getDrillBountyVault(
        bountyId,
        program,
        connection,
    );

    return { ...bounty, ...bountyVault };
};

export { getDrillResponse };