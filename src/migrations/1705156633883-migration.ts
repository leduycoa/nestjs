import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705156633883 implements MigrationInterface {
    name = 'Migration1705156633883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8b17d5d91bf27d0a33fb80ade8f"`);
        await queryRunner.query(`CREATE TYPE "public"."client_type_enum" AS ENUM('Organization', 'Person')`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."client_type_enum" NOT NULL DEFAULT 'Organization', "address" character varying NOT NULL, "city" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isPrimaryContact" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientIdId" uuid, "userIdId" uuid, CONSTRAINT "REL_89d34756ea28229163be4516e9" UNIQUE ("userIdId"), CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "branchId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_usertype_enum" AS ENUM('Internal', 'External')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userType" "public"."user_usertype_enum" NOT NULL DEFAULT 'Internal'`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('Active', 'Inactive')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT 'Active'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" "public"."user_gender_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_97b11d8cdd1a4f7ebf8698ee2d0" FOREIGN KEY ("clientIdId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_89d34756ea28229163be4516e90" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_89d34756ea28229163be4516e90"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_97b11d8cdd1a4f7ebf8698ee2d0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying NOT NULL DEFAULT 'none'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userType"`);
        await queryRunner.query(`DROP TYPE "public"."user_usertype_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "branchId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'intern'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "public"."client_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8b17d5d91bf27d0a33fb80ade8f" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
