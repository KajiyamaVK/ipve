-- CreateTable
CREATE TABLE `kinsRelations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idKinA` INTEGER NOT NULL,
    `idKinB` INTEGER NOT NULL,
    `relation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kinsLabels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kinsRelations` ADD CONSTRAINT `kinsRelations_idKinA_fkey` FOREIGN KEY (`idKinA`) REFERENCES `people`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kinsRelations` ADD CONSTRAINT `kinsRelations_idKinB_fkey` FOREIGN KEY (`idKinB`) REFERENCES `people`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
