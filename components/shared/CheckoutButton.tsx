"use client";
import { IEvent } from "@/lib/database/models/event.model";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Checkout from "./Checkout";

type CheckoutButtonProps = {
  event: IEvent;
};

const CheckoutButton = ({ event }: CheckoutButtonProps) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const { user } = useUser(); // that is cuz it is client component
  const userId = user?.publicMetadata.userId as string;
  return (
    <div className="flex items-center gap-3">
      {/* Cannot buy past events */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer avaulable.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size={"lg"}>
              <Link href={"/sign-in"}>Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout userId={userId} event={event}/>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
