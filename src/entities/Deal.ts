import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Contact } from "./Contact";

@Entity("deals")
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  value: number;

  @ManyToMany(() => Contact, (contact) => contact.deals)
  @JoinTable({
    name: "contacts_deals",
    joinColumn: {
      name: "deal_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "contact_id",
      referencedColumnName: "id",
    },
  })
  contacts: Contact[];
}
