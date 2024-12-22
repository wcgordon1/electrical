---
term: Power Supply
icon: 'mdi:gate-xnor'
category: Hardware
vertical: PLC
description: >-
  Module providing regulated DC power to the PLC system, often including battery
  backup for memory retention.
details:
  - title: Category
    value: Hardware
  - title: Industry
    value: PLC
  - title: Related Terms
    value: 'CPU Module, Backplane, Memory Module, Safety PLC, Remote I/O'
---
Power Supply in the context of a Programmable Logic Controller (PLC) system refers to a crucial component that provides the necessary regulated Direct Current (DC) power to various modules within the PLC system. The power supply module ensures that all connected components receive a stable and consistent voltage, which is essential for the reliable operation of the system. Additionally, many PLC power supply units incorporate a battery backup feature, which is vital for memory retention. This backup ensures that in the event of a power failure, program data and system settings stored in volatile memory are not lost, thus maintaining system integrity and reducing downtime.

## Common Applications

### Industrial Automation
Power supplies in PLC systems are extensively used in industrial automation environments where they power controllers that manage machinery and processes. These systems require stable power to ensure precision and reliability in operations such as assembly lines, robotic cells, and material handling systems.

### Building Management Systems
In building management, PLC power supplies are used to support systems that control heating, ventilation, air conditioning (HVAC), lighting, and security systems. Consistent power is crucial in these applications to maintain optimal environmental conditions and safety.

### Utilities and Infrastructure
Power supplies are also deployed in PLC systems used by utilities for managing water treatment plants, electrical grids, and other infrastructure. The integrity of the power supply is vital to ensure continuous operation and to avoid service interruptions.

## Safety Considerations

### Overload Protection
Power supplies should be equipped with overload protection to prevent damage to the PLC components and connected devices. This includes features like current limiting and automatic shutdown in the event of a short circuit or excessive current draw.

### Voltage Regulation
Ensuring proper voltage regulation is crucial to prevent damage to sensitive electronic components in the PLC system. Fluctuations in power supply can lead to erratic system behavior or permanent damage.

### Battery Maintenance
For power supplies with battery backup, regular maintenance and testing of the battery are necessary to ensure it functions correctly during power outages. This involves checking the charge level and replacing the battery as needed.

## Related Terms or Concepts

### Redundant Power Supply
A redundant power supply refers to a system design that includes multiple power supply units to provide an additional layer of reliability. If one power supply fails, others can take over, ensuring continuous power to the PLC system.

### Uninterruptible Power Supply (UPS)
A UPS is a device that provides emergency power to a load when the input power source, typically the main supply, fails. It offers immediate protection from input power interruptions by supplying energy stored in batteries, supercapacitors, or flywheels.

### Voltage Regulation Module (VRM)
A VRM is a component that provides precise voltage regulation to the PLC system, ensuring that the components receive the correct voltage level regardless of variations in the input power supply.

### Memory Retention
Memory retention in the context of PLC power supplies refers to the capability of retaining data in the PLC’s memory during power outages, often achieved through battery-backed power supplies. This ensures that critical data and system configurations are not lost.
