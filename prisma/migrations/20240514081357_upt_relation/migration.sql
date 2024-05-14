-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_customerId_fkey`;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
