import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705026144669 implements MigrationInterface {
    name = 'Migration1705026144669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pc" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "addrIp" character varying NOT NULL, "branchId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_556ee68cdd23c003f594ad26299" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pc_usage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "pcId" uuid NOT NULL, "status" character varying NOT NULL DEFAULT 'use', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dfb3c1dae635f81e32bfe10cedf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'intern', "gender" character varying NOT NULL DEFAULT 'none', "address" character varying, "branchId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pc" ADD CONSTRAINT "FK_a82b16ca7a76249edd040c657df" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pc_usage" ADD CONSTRAINT "FK_0aef204a4e0380bbdbc98b5ae32" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pc_usage" ADD CONSTRAINT "FK_4021d748f713a053e55b59b3f5e" FOREIGN KEY ("pcId") REFERENCES "pc"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8b17d5d91bf27d0a33fb80ade8f" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8b17d5d91bf27d0a33fb80ade8f"`);
        await queryRunner.query(`ALTER TABLE "pc_usage" DROP CONSTRAINT "FK_4021d748f713a053e55b59b3f5e"`);
        await queryRunner.query(`ALTER TABLE "pc_usage" DROP CONSTRAINT "FK_0aef204a4e0380bbdbc98b5ae32"`);
        await queryRunner.query(`ALTER TABLE "pc" DROP CONSTRAINT "FK_a82b16ca7a76249edd040c657df"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "pc_usage"`);
        await queryRunner.query(`DROP TABLE "pc"`);
    }

}
