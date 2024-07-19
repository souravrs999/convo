import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Chats() {
  return (
    <div className="h-full my-20 overflow-y-auto">
      <div className="flex flex-col gap-6 p-4 justify-end overflow-auto">
        <div className="flex justify-end">
          <div className="flex gap-2 items-start">
            <div className="flex flex-col items-end">
              <h3 className="text-accent font-bold text-sm">Jordan Betord</h3>
              <div className="flex flex-col bg-[#d7edc1] p-2 px-4 text-xs mt-1 rounded-[15px_5px_15px_15px] w-fit">
                <div className="flex items-center gap-4 mt-1">
                  <div className="grid place-items-center w-7 h-7 rounded-lg bg-accent">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                  </div>
                  <div className="flex h-6 items-center gap-[1px]">
                    {Array.from(new Array(50)).map((_, idx) => (
                      <div
                        key={idx}
                        className={cn("w-[2px] bg-accent", {
                          "bg-gray-400": idx > 20,
                        })}
                        style={{
                          height: `${Math.floor(Math.random() * 100) + 1}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-1">
                  <time>12:11</time>
                  <span className="font-bold text-accent">xx</span>
                </div>
              </div>
            </div>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="avatar"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <Image
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <div className="flex flex-col">
            <h3 className="text-accent font-bold text-sm">Daniel Garcia</h3>
            <div className="flex flex-col bg-[#eddbdb] py-2 px-4 text-xs mt-1 rounded-[5px_15px_15px_15px] w-fit">
              <p className="text-accent font-semibold">
                check out pls this initial sketch for our new project?
              </p>
              <div className="flex justify-start gap-2 mt-1">
                <time>12:04</time>
                <span className="font-bold text-accent">
                  <FontAwesomeIcon
                    className="w-3 h-3"
                    icon={Icons.checkDouble}
                  />
                </span>
              </div>
            </div>
            <div className="relative w-full mt-6">
              <span className="absolute w-[400px] h-[300px] bg-[#eddbdb] rounded-xl transform rotate-3"></span>
              <span className="absolute w-[400px] h-[300px] bg-[#d7edc1] rounded-xl transform -rotate-3"></span>
              <Image
                src="/chat-sketch.png"
                alt="avatar"
                width={400}
                height={400}
                className="rounded-xl relative"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2 items-start">
            <div className="flex flex-col items-end">
              <h3 className="text-accent font-bold text-sm">Jordan Betord</h3>
              <div className="flex flex-col bg-[#d7edc1] py-2 px-4 text-xs mt-1 rounded-[15px_5px_15px_15px] w-fit">
                <p className="text-accent font-semibold">
                  Hi team Let&apos; hop on call to discuss the new project.
                </p>
                <div className="flex justify-end gap-2 mt-1">
                  <time>12:11</time>
                  <span className="font-bold text-accent">xx</span>
                </div>
              </div>
              <div className="flex flex-col bg-[#d7edc1] py-2 px-4 text-xs mt-1 rounded-[15px_5px_15px_15px] w-fit">
                <p className="text-accent font-semibold">Good Concepts!</p>
                <div className="flex justify-end gap-2 mt-1">
                  <time>12:13</time>
                  <span className="font-bold text-accent">xx</span>
                </div>
              </div>
            </div>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="avatar"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2 items-start">
            <div className="flex flex-col items-end">
              <h3 className="text-accent font-bold text-sm">Jordan Betord</h3>
              <div className="flex flex-col bg-[#d7edc1] p-2 px-4 text-xs mt-1 rounded-[15px_5px_15px_15px] w-fit">
                <div className="flex items-center gap-4 mt-1">
                  <div className="grid place-items-center w-7 h-7 rounded-lg bg-accent">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                  </div>
                  <div className="flex h-6 items-center gap-[1px]">
                    {Array.from(new Array(50)).map((_, idx) => (
                      <div
                        key={idx}
                        className={cn("w-[2px] bg-accent", {
                          "bg-gray-400": idx > 20,
                        })}
                        style={{
                          height: `${Math.floor(Math.random() * 100) + 1}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-1">
                  <time>12:11</time>
                  <span className="font-bold text-accent">xx</span>
                </div>
              </div>
            </div>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="avatar"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <Image
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <div className="flex flex-col">
            <h3 className="text-accent font-bold text-sm">Daniel Garcia</h3>
            <div className="flex flex-col bg-[#eddbdb] py-2 px-4 text-xs mt-1 rounded-[5px_15px_15px_15px] w-fit">
              <p className="text-accent font-semibold">
                check out pls this initial sketch for our new project?
              </p>
              <div className="flex justify-start gap-2 mt-1">
                <time>12:04</time>
                <span className="font-bold text-accent">xx</span>
              </div>
            </div>
            <div className="relative w-full mt-6">
              <span className="absolute w-[400px] h-[300px] bg-[#eddbdb] rounded-xl transform rotate-3"></span>
              <span className="absolute w-[400px] h-[300px] bg-[#d7edc1] rounded-xl transform -rotate-3"></span>
              <Image
                src="/chat-sketch.png"
                alt="avatar"
                width={400}
                height={400}
                className="rounded-xl relative"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2 items-start">
            <div className="flex flex-col items-end">
              <h3 className="text-accent font-bold text-sm">Jordan Betord</h3>
              <div className="flex flex-col bg-[#d7edc1] py-2 px-4 text-xs mt-1 rounded-[15px_5px_15px_15px] w-fit">
                <p className="text-accent font-semibold">
                  Hi team Let&apos; hop on call to discuss the new project.
                </p>
                <div className="flex justify-end gap-2 mt-1">
                  <time>12:11</time>
                  <span className="font-bold text-accent">xx</span>
                </div>
              </div>
              <div className="flex flex-col bg-[#d7edc1] py-2 px-4 text-xs mt-1 rounded-[15px_5px_15px_15px] w-fit">
                <p className="text-accent font-semibold">Good Concepts!</p>
                <div className="flex justify-end gap-2 mt-1">
                  <time>12:13</time>
                  <span className="font-bold text-accent">xx</span>
                </div>
              </div>
            </div>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="avatar"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <Image
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <div className="flex flex-col">
            <h3 className="text-accent font-bold text-sm">Monika</h3>
            <p className="text-xs">is typing ...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
