import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { TextResponseModel } from "src/customer/models";
import { ClaimRepository } from "src/db/repositories";
import { RemoveClaimCommand } from "../impl";

@CommandHandler(RemoveClaimCommand)
export class RemoveClaimHandler implements ICommandHandler<RemoveClaimCommand> {
    constructor(
        @InjectRepository(ClaimRepository)
        private readonly claimRepository: ClaimRepository,
    ) {}

    async execute(command: RemoveClaimCommand): Promise<TextResponseModel> {
        const { id } = command;

        const claim = await this.claimRepository.findOne(id);

        try {
            await this.claimRepository.delete(claim);

            return { response: 'Claim removed' }
        } catch (error) {
            throw new RpcException({ errorStatus: 'Cannot remove claim', statusCode: 400 })
        }
    }
}