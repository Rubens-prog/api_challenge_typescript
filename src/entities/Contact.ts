import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Deal } from "./Deal";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  phone: string;

  @ManyToMany(() => Deal, (deals) => deals.contacts, {
    cascade: true,
  })
  deals: Deal[];
}
