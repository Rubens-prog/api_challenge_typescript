import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1698007773690 implements MigrationInterface {
    name = 'Default1698007773690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deals" ("id" SERIAL NOT NULL, "name" text NOT NULL, "value" numeric(10,2) NOT NULL, CONSTRAINT "PK_8c66f03b250f613ff8615940b4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts_deals" ("deal_id" integer NOT NULL, "contact_id" integer NOT NULL, CONSTRAINT "PK_6e40eac5a474e15869898e8a370" PRIMARY KEY ("deal_id", "contact_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d873ec8496f691a8cf6deff604" ON "contacts_deals" ("deal_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e6019da848cb332199176fd362" ON "contacts_deals" ("contact_id") `);
        await queryRunner.query(`ALTER TABLE "contacts_deals" ADD CONSTRAINT "FK_d873ec8496f691a8cf6deff604c" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contacts_deals" ADD CONSTRAINT "FK_e6019da848cb332199176fd3627" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts_deals" DROP CONSTRAINT "FK_e6019da848cb332199176fd3627"`);
        await queryRunner.query(`ALTER TABLE "contacts_deals" DROP CONSTRAINT "FK_d873ec8496f691a8cf6deff604c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6019da848cb332199176fd362"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d873ec8496f691a8cf6deff604"`);
        await queryRunner.query(`DROP TABLE "contacts_deals"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "deals"`);
    }

}
