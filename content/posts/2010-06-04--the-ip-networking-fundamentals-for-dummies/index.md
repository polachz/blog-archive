---
title: The IP Networking Fundamentals for Dummies
tags: ["IP", "Networking", "Dummies"]
cover: network1.jpg
author: Zdenek Polach
---

<re-img
    src="network1.jpg"
    title="Photo by Joanna Kosinska on Unsplash"
    href="https://unsplash.com/photos/B6yDtYs2IgY"
    >
</re-img>

In this post you can find a brief description of the IP network topology terminology and functionality.

If you read an article about networking or tried to use some hints from the Internet targeted on networking, maybe you will find that those articles operates with terms as IP address, Subnet mask, Network IP address range, Default gateway IP etc. If you are familiar with those terms, then you do not read this article.

In next paragraphs I’ll try to explain those terms:
* IP Address
* Public/Private IP address
* Subnet
* Subnet Mask
* Broadcast
* Router
* Default Gateway
* NAT
* [DHCP](#dhcp-link)

I’ll try to explain it very easily and by form understandable for normal computer user with no networking experience. Then I’ll use some simplification here. If you are networking geek, do not beat me ;)




## IP Address


So first question here can be here: What the IP address is?

Networks are targeted to deliver messages between computers. For correct message delivery, you have to specify exact destination for any message. It is same case as you send classical “snail mail” letter by your post office. You write address on the envelope and put the letter to the post system.

As you know, if you write address as “John Smith” then post office will not deliver the letter correctly, because the address is insufficient. Postmen don’t know if the letter is for Mr. Smith in London, or somewhere else. You have to write more exact address: “Mr. Harry Potter, The Cupboard under the stairs, Privet Drive, Little Whinging, Surrey”. This exact address grants successful letter delivery, because is unique worldwide.

Computers use same concept. Any computer connected to the Internet must have one, unique address in this environment. This address is known as IP address. At present, whole internet is using IP address version 4. IPv4 has been specified as 32 bit long value in the past and has form of four numbers in range 0-255 divided by dot. For example 11.12.13.14 is valid IP address. By easy calculation you can find that this form of IP address can uniquely mark 4.3 billion (4.3×109) computers. In practice, some blocks of IPv4 addresses are reserved for special use, and then real count of available addresses is lower.

To grant that two computers on the Internet will not have same IP address an administration authority for IP address space has to be founded. At practice here is one global authority called “Internet Assigned Numbers Authority“ (IANA), which assign blocks of public IPs to other organizations and ISPs and they assign IPs to their business partners or customers.

Designers of the IPv4 address expected that this amount of unique addresses will be completely sufficient in the future. But in those days, due explosive growth of the Internet the past, we are near to state when last block of free IPv4 addresses will be assigned for use and the Internet address space will be saturated. To solve this problem, new IP address standard has been specified. It is IPv6 address format. IPv6 address is 128bit long thus it supports 2128 (about 3.4×1038) addresses. But IPv6 is still not supported by many ISPs, so for our purposes we will continue with IPv4 addresses only.




## Public/Private IP Address


Ok, now you can imagine what IP address is and how it is used in networking environment. But not all IP addresses are used by same way. Some special IP addresses or blocks of IP address are reserved for special use. For our purposes we have to describe difference between Public and Private IP address.

Network designers discovered in the past that some computers do not need to be connected to the public Internet. For example some military networks are completely disconnected from the Internet due security requirements. For those purposes, some blocks of IP addresses has been reserved for private use and the IP networking technology grants that computers with those private addresses cannot be reached from computers with public IP address and vice versa. Messages from public IP to private IP are not delivered by default and are dropped. If you will try to explore this deeply, you will find that that this message drop concept is necessary, because more than one private network can exist and then inside those networks we can have computers with the same IP address. Due this we lost unambiguous delivery mechanism for those cases and then we cannot grant unique message delivery.

| Block Size            | IP Values                     |
| --------------------- | ----------------------------- |
| 24-bit block          | 10.0.0.0 – 10.255.255.255     |
| 20-bit block          | 172.16.0.0 – 172.31.255.255   |
| 16-bit block          | 192.168.0.0 – 192.168.255.255 |

If you see a computer with IP address from those ranges then it is a part of private LAN network.

## Subnet

In previous paragraphs I described the addressing principles of the IP networking. But to make network message delivery process more efficient, we have to define term of subnets and routing.

When I tried to describe addressing principles, I have used “snail mail” as well known example, because everybody has experience with classical letter delivery. And this can helps to us to understand subnet principles too. For example you do not send a letter to your wife sitting in same room to ask her for something. You ask her directly instead. But if you need an answer from your brother from different city, you will not travel there to do that directly. You will use phone or letter instead to communicate with him.

The computers on one subnet are in same relationship as you and your wife in previous example. They can communicate easily to each other without any additional mechanism. One subnet can be computers in your home, in your office, or customer computers handled by one ISP. But when they need to send a message to computer on different subnet, they have to use “post office” called router.

## Subnet Mask

Subnet is specified by Subnet mask. In some articles you can find Network mask term instead. The Subnet mask has similar form as IP address; 32 bit size and representerd by four numbers divided by dot. But Subnet mask have to hold special format and rules. The limitation for the mask is that in 32 bit representation the mask must have first bit set to 1 and cannot have a bit set to 1 after any 0 bit. Because mask specified by 4 numbers is little bit long and uncomfortable to be written, last days we can see new format, known as CIDR. In shortm the CIDR specified number of bits set to 1 in the mask. Here are some examples: 

| CIDR | Mask value         | Binary representation            |
| -----|------------------- | -------------------------------- |
|  /8  | 255.0.0.0          | 11111111000000000000000000000000 |
|  /24 | 255.255.255.0      | 11111111111111111111111100000000 |
|  /28 | 255.255.255.240    | 11111111111111111111111111110000 |
|  /32 | 255.255.255.255    | 11111111111111111111111111111111 |



By network mask the IP address is divided to two portions:
* Network Portion
* Host Portion

If you represent any IP address in binary form, then Subnet mask divide this address to those two portions by this way:

The Network Portion is the left part of the IP address with length equal to count of bits with value equal to one in the mask. The rest of the IP address (or right part) is the Host Portion. Both portions are again represented in dotted format, but rest of the Portion is filled by zero bits.

The easy algorithm how to get Network Portion from the IP and Subnet Mask is to provide logical AND between those values. The Host Portion we get by logical AND with IP value and negation of the Subnet mask value. 

Here is example for 192.168.1.2/24 CIDR representation:
 
| Value       | IP Value      | Binary Net Portion        | Binary Host Portion |
|-------------|---------------|---------------------------|-------------------- |
| IP	      | 192.168.1.2   | 110000001010100000000001  | 00000010            |
| Mask        | 255.255.255.0 | 111111111111111111111111  | 00000000            |
| Net Portion | 192.168.1.0   | 110000001010100000000001  | 00000000            |
| Host Portion|	0.0.0.2	      | 000000000000000000000000  | 00000010            |

The network mask also specified how many computers can be maximally placed into the subnet. This value is 2 powered by count of zero bits minus two. For example the mask 255.255.255.0 has 8 bits with zero value. Then the maximal count of computers in this subnet is 28 -2 = 256 -2 = 254. Maybe you are surprised why we subtract two from this value. The reason to do this is that any subnet has two reserved addresses for special purposes. One of them is broadcast address which has whole Host Portion filled by bits with value equal to 1. The value with Host Portion filled by bits with value equal to 0 and is reserved for network ID. Then real amount of subnet addresses available for real computers is decreased by 2.

From computer own (local) IP, Subnet mask and remote IP value the computer can easily detect if remote IP owner is in the same subnet or not and determine how to communicate with him.

Computer calculates Network Portions of local IP and remote IP by Subnet Mask. Then compare both results. If both are same, the both computers are on same subnet. Otherwise destination IP owner is in different subnet and router is instrumented to deliver the message to the destination. The router functionality will be described later.

The computer algorithm for this task looks like this:
  * Provide logical AND operation with local IP and Network mask
  * Provide logical AND operation with remote IP and Network Mask
  * Provide compare of results from previous steps
  * If results are equal, use local delivery mechanism
  * Otherwise instrument the router to deliver the message

Here is an example:

<table >
<thead>
<tr > <th ><b>Value </th>
<th ><b>IP Value</th>
<th ><b>Binary Representation</th>
</tr>
</thead>
<tbody >
<tr ><td >LocalIP</td>
<td >192.168.1.2</td>
<td >11000000101010000000000100000010</td>
</tr>
<tr ><td >Mask</td>
<td >255.255.255.0</td>
<td >11111111111111111111111100000000</td>
</tr>
<tr ><td >RemoteIP1</td>
<td >192.168.1.100</td>
<td >11000000101010000000000101100100</td>
</tr>
<tr ><td >RemoteIP2</td>
<td >192.168.2.100</td>
<td >11000000101010000000001001100100</td>
</tr>
</tbody>
<thead>
<tr ><th colspan="3" style="text-align: center;" ><b>AND Operation results</th></tr>
</thead>
<tbody >
<tr ><td >LocalIP AND Mask</td>
<td >192.168.1.0</td>
<td style="background: lightgreen;">1100000010101000000000<b>01</b>00000000</td>
</tr>
<tr ><td >RemoteIP1 AND Mask</td>
<td >192.168.1.0</td>
<td style="background: lightgreen;">1100000010101000000000<b>01</b>00000000</td>
</tr>
<tr ><td >RemoteIP2 AND Mask</td>
<td >192.168.2.0</td>
<td style="background: #FF99FF;">1100000010101000000000<b>10</b>00000000</td>
</tr>
</tbody>
</table>

You can see that the AND operation with Subnet mask provide simple operation. Leaves all bits in “masked” IP where is 1 in the mask untouched, and zeroed all bits where the mask has bit value 0.

When you compare results of previous operations, you can see that RemoteIP1 is in same subnet as LocalIP and RemoteIP2 is in different subnet. If you change the mask to the value 255.255.0.0, then remoteIP2 will be in same subnet too.

Final conclusion for subnet is:
  * Computers in the same subnet can communicate directly
  * Computers in different subnets have to communicate through router

## Broadcast IP Address

In previous part I have mentioned a broadcast address. The broadcast address is used if a computer on the subnet needs to deliver a message to all other computes on the subnet. In this case the computer uses the broadcast address as a destination address of the message. It provides the message content to the all available computers on the subnet. For previous example values when subnet is 192.168.1.0/255.255.255.0 then the broadcast address for subnet has value 192.168.1.255.

## Default Gateway and Router

Now we have specified IP address, Network mask and we know for what are those values used. To get complete picture, we have to specify router functionality and Default Gateway IP value.

As I mentioned before, the router is something like “post office” in real world. If you need to send a message to computer in different subnet, then you will send this message to the router. Then router will send the message to router, aka “post office” of the destination subnet. Then router for destination subnet will finally deliver your message to final recipient. In real world, the computer message can goes through many routers before it reach the final destination.
Routers hold and dynamically update set of information how to deliver any message to right destination. Routing is more complex problem but for brief picture of the networking the explanation above is enough.
Now you may be asked how the computer identifies the router in own subnet? The answer is by next network configuration parameter called Default Gateway IP. This value specifies the IP address of your subnet router. If the computer does not know how to deliver any message directly, then it uses the default gateway. And router on this IP will take care about rest of correct delivery process.

## NAT

The next interesting thing which I can describe here is Network Address Translation (NAT) mechanism. As you remember from previous lines if you are in Private subnet and has assigned a private IP address, then public internet IPs are invisible for you. But maybe you know, that lot of computers has assigned the private IP address but for all that can connect to the Internet! Then, what is truth?

The answer for this question is that NAT technology allows that. Without active NAT router is not possible to reach the public IP from private subnet.

Router with NAT capability is something like “bridge” between private subnet and the public subnet(s). When this router obtain requirement to send a message from the private to the public subnet, then it replace the private IP with own public IP and provide the message delivery as it be originated on the NAT router with its public IP.NAT router has a translation table inside and provide here record for any connection from any private IP, so by this table it can translate all replies back to the private network correctly. So for connections generated from the local private subnet it is completely transparent and clear.
Problem can occurs only with connections initiated from outside to the private subnet. In this case, NAT router cannot easily determine for which computer in the private subnet this connection is. Here we can help to the router with explicit specification of this info in its configuration. We have to select one or more computers which will be instrumented when an outside connection arrives. For example for WWW server you choose one IP and for FTP server second (Or both can be same, if the server on one IP works as FTP and WWW together).

NAT router then knows that all FTP connections will be forwarded to this FTP server IP and all WWW connections will be forwarded to second IP where WWW server is present.

So you can have only one server for one kind of communication available from the public subnets inside the NAT private subnet. It’s the NAT major limitation.

NAT technology is now massively used, because it allows to many computers share only one public IP address and then it saves high valuable commodity: free public IP addresses. If you have an own home network, then for 99.9% you are using the NAT technology for your home computers connectivity to the Internet.
<a name="dhcp-link"></a>

## DHCP

Finally, I can describe next useful technology for IP networking, the Dynamic Host Configuration Protocol (DHCP) based IP address assignment.
As you remember, all computers communicating by IP protocol must have unique IP address. If it is public IP address, then it has to be unique worldwide. In private subnet, it has to be unique inside the subnet.

You can reach this by two ways: Each computer will get one unique IP from Network Administrator and have to use only this address. Network Administrator is responsible to do not assign same IP to two or more computers. It is sufficient for really small networks and for computers which are not roaming. For servers, fixed office workstations or home PC. If you brings new computer to the network, you have to ask your Admin for new free IP and set it to the computer manually. It is boring and not so comfortable. So this approach is often used only for servers, where is necessary to be accessed still on one well known IP. For other computers, the DHCP mechanism is used.

When you brings new computer to the subnet and connect it, then if this computer has DHCP client enabled (and it is default now for any OS) it starts DHCP based IP assignment process.

The computer tries to locate a DHCP server on the subnet by special broadcast and say to him: “Hallo, new computer is here, please give an IP address to it”. The DHCP server then selects one free unassigned IP from own DHCP managed IP address pool and start negotiating about assignment of the IP with the asking computer. The DHCP server doesn’t send only the IP to the client. The DHCP server gives the subnet mask and default gateway IP to the client too, plus some additional information as DNS server address. Then by this mechanism the computer networking environment can be configured automatically.

The DHCP server “leases” the IP address to the asking client only for some time. This lease period is specified in the reply too. During this time, this IP is not free and will be not assigned to new clients. Before this lease expiration, the client has to renew the lease, or must have to stop use the IP.

Very often the DHCP server doesn’t manage whole subnet but the subnet is divided to two pools. One for manually assigned IP addresses (for local servers etc) and the second is for DHCP assignment. For example, addresses 192.168.1.1-100 are for static IPs and 192.168.1.100-254 is for DHCP. This can be found in DHCP server configuration.

All home routers work also as DHCP servers and in Internet café or in office networks the DHCP is enabled by default and is possible to configure newly connected computers by this way. Then by default, you do not need to take care about IP address assignment in your laptop or other computer if you really do not want to. Good reason for manual IP assignment is an NAS or server in the subnet.

Ok, it is all from me now about his topics. I believe that after reading of this post you are able to understand to some previously “magic” values in your network configuration and you are able to modify those values with brief understanding what you are doing.

Happy networking ;)

Note: This article was originally published on my previous site polach.cc. Because I had to change the domain I have moved the article here from the previous site.
